import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream'; // Better way to handle file uploads in Next.js 

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
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
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

    return NextResponse.json({ success: true });
  } catch (error) {
    // This logs the ACTUAL error to your VS Code terminal 
    console.error("Checkout error detailed:", error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}