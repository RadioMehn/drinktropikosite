'use client';

export default function Contact() {
  return (
    <main className="page-wrapper">
      <section className="section-padding center-text">
        <div className="section-header">
          <h1>Get In Touch</h1>
          <p>We believe in transparency. Reach out to the Tropiko team with any questions.</p>
        </div>

        <div className="contact-box" style={{ marginTop: '40px' }}>
          <div className="contact-item">
            <h3>Business Inquiries</h3>
            <a href="mailto:tropiko.ph.business@gmail.com">tropiko.ph.business@gmail.com</a>
          </div>
          <div className="contact-item">
            <h3>Phone Number</h3>
            <a href="tel:+6309953718983">+63 09953718983</a>
          </div>
        </div>
        
        <div style={{ marginTop: '60px' }}>
          <p style={{ color: 'var(--text-light)' }}>Follow the journey on social media:</p>
          <div className="btn-group" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <a href="https://www.instagram.com/drinktropiko/" target="_blank" className="btn btn-outline">Instagram</a>
            <a href="https://www.tiktok.com/@drinktropiko" target="_blank" className="btn btn-outline">TikTok</a>
          </div>
        </div>
      </section>
    </main>
  );
}