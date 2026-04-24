'use client';

import { useEffect } from 'react';

export default function Contact() {
  
  // Brings back the smooth fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); 
  }, []);

  return (
    <main className="page-wrapper">
      <section className="section-padding center-text">
        
        <div className="section-header animate-on-scroll">
          <h1>Get In Touch</h1>
          <p>We believe in transparency. Reach out to the Tropiko team with any questions.</p>
        </div>

        <div className="contact-box">
          
          {/* Card 1: Email */}
          <div className="contact-item animate-on-scroll delay-100">
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>✉️</div>
            <h3>Business Inquiries</h3>
            <a href="mailto:tropiko.ph.business@gmail.com">tropiko.ph.business@gmail.com</a>
          </div>

          {/* Card 2: Phone */}
          <div className="contact-item animate-on-scroll delay-200">
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📞</div>
            <h3>Phone Number</h3>
            <a href="tel:+6309953718983">+63 09953718983</a>
          </div>
          
        </div>

        {/* Social Media Section */}
        <div className="animate-on-scroll delay-300" style={{ marginTop: '80px' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '1.1rem' }}>
            Follow the journey on social media:
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <a href="https://www.instagram.com/drinktropiko/" target="_blank" rel="noreferrer" className="btn btn-outline">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@drinktropiko" target="_blank" rel="noreferrer" className="btn btn-outline">
              TikTok
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}