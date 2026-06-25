import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream'; // Better way to handle file uploads in Next.js 
import nodemailer from 'nodemailer'; // logic for email confirmations

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get('file') as File;
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const location = data.get('location');
    const orderSummaryStr = data.get('orderSummary') as string;
    
    const cart = JSON.parse(orderSummaryStr || '[]');
    let pp1Qty = 0;
    let pp4Qty = 0;

    cart.forEach((item: any) => {
      if (item.cartId === 'pina-single') pp1Qty += item.qty;
      if (item.cartId === 'pina-pack') pp4Qty += item.qty;
    });

   // 1. Initialize OAuth2 Client (Personal Account Method)
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    // --- DAILY FOLDER LOGIC --- 
    const today = new Date().toLocaleDateString('en-PH', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });

    const searchResponse = await drive.files.list({
      q: `name = '${today}' and '${process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id)',
    });

    let dailyFolderId;

    if (searchResponse.data.files && searchResponse.data.files.length > 0) {
      dailyFolderId = searchResponse.data.files[0].id;
    } else {
      const folderResponse = await drive.files.create({
        requestBody: {
          name: today,
          parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID!],
          mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
      });
      dailyFolderId = folderResponse.data.id;
    }

    // 2. Upload Proof of Payment 
    const buffer = Buffer.from(await file.arrayBuffer());
    const driveResponse = await drive.files.create({
      requestBody: {
        name: `Proof_${name}_${Date.now()}`,
        parents: [dailyFolderId!], 
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer), // Using the imported Readable 
      },
    });

    const fileUrl = `https://drive.google.com/file/d/${driveResponse.data.id}/view`;

    // 3. Append to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('en-PH'), // A: Date
          email,                              // B: Email Address
          name,                               // C: Name
          phone,                              // D: Phone Number
          location,                           // E: Location
          pp1Qty || 0,                        // F: PP 1 (Quantity)
          pp4Qty || 0,                        // G: PP 4 (Quantity)
          fileUrl                             // H: Proof of Payment Link
        ]],
      },
    });
    // ==========================================
    // --- AUTOMATED EMAIL CONFIRMATIONS ---
    // ==========================================
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 1. Calculate the total and build a shared Receipt HTML block
    // (If your cart array doesn't pass 'item.price', this defaults to 150 for singles and 600 for packs)
    const totalAmount = cart.reduce((sum: number, item: any) => {
      const price = item.price || (item.cartId === 'pina-single' ? 150 : 600);
      return sum + (price * item.qty);
    }, 0);

    const receiptSummaryHTML = `
      <div style="background-color: #f0fff4; padding: 25px; border-radius: 12px; margin: 20px 0; border: 1px solid rgba(168, 230, 207, 0.4);">
        <h3 style="margin-top: 0; color: #2D3436; font-size: 18px; margin-bottom: 15px;">Order Summary</h3>
        
        <ul style="list-style-type: none; padding: 0; margin: 0 0 20px 0;">
          ${cart.map((item: any) => `
            <li style="padding: 10px 0; border-bottom: 1px solid rgba(168, 230, 207, 0.3); font-size: 16px; color: #2D3436;">
              <strong>${item.qty}x</strong> ${item.name || (item.cartId === 'pina-single' ? 'Piña Paradise (Single)' : 'Piña Paradise (4-Pack)')}
            </li>
          `).join('')}
        </ul>
        
        <h3 style="margin: 0; color: #2D3436; font-size: 20px; border-top: 2px solid #A8E6CF; padding-top: 15px;">
          <strong>Total Paid:</strong> ₱${totalAmount}
        </h3>
      </div>
    `;

    // 2. The Admin Notification (Sent to Tropiko)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🚨 New Tropiko Order: ${name}`, 
      html: `
        <div style="font-family: 'Outfit', sans-serif, Arial; color: #2D3436; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A8E6CF; background: #0F172A; padding: 15px; border-radius: 10px; text-align: center;">New Order Received!</h2>
          
          <h3>Customer Details:</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="margin: 5px 0;"><strong>Delivery Address:</strong> ${location}</p>
          
          ${receiptSummaryHTML} <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #636E72; font-size: 14px;"><em>Payment proof has been saved to your Google Drive, and details are logged in Google Sheets.</em></p>
        </div>
      `,
    };

    // 3. The Customer Receipt (Sent to the Buyer)
    const customerMailOptions = {
      from: `"Tropiko" <${process.env.EMAIL_USER}>`,
      to: email as string, 
      subject: `Your Tropiko Order is Confirmed! 🌴`,
      html: `
        <div style="font-family: 'Outfit', sans-serif, Arial; color: #2D3436; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <h2 style="color: #A8E6CF; text-align: center; font-size: 26px; margin-bottom: 20px;">Order Confirmed!</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="font-size: 16px; line-height: 1.6;">Thank you for choosing Tropiko! We have successfully received your order details and your proof of payment.</p>
          <p style="font-size: 16px; line-height: 1.6;">Our team is currently processing your order, and we will contact you shortly at <strong>${phone}</strong> regarding your delivery timeline.</p>
          
          ${receiptSummaryHTML} <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <p style="margin: 0; font-size: 15px; color: #636E72; line-height: 1.6;">
              Have any questions or concerns? <br/>
              Message us on Instagram <a href="https://www.instagram.com/drinktropiko" style="color: #A8E6CF; text-decoration: none; font-weight: 700;">@drinktropiko</a> and we'll be happy to help!
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 5px;">Experience Paradise In Every Sip,</p>
          <p style="font-size: 16px; font-weight: bold; margin-top: 0;">The Tropiko Team</p>
        </div>
      `,
    };

    // Fire off both emails simultaneously
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);
    // ==========================================
    return NextResponse.json({ success: true });
  } catch (error) {
    // This logs the ACTUAL error to your VS Code terminal 
    console.error("Checkout error detailed:", error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}