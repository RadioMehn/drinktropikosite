'use client';

import { useEffect } from 'react';

export default function Lambanog() {
  
  // --- THE SCROLL ANIMATION ENGINE ---
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
  // -----------------------------------

  return (
    <main className="page-wrapper">
      <section className="section-padding center-text">
        <div className="section-header animate-on-scroll">
          <h1>The Spirit of the Coconut</h1>
          <p>Understanding the heart of our hard seltzer.</p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#f9fdfb' }}>
        <div className="about-container">
          <div className="highlight-block animate-on-scroll">
            <div className="highlight-content">
              <h2>What is Lambanog?</h2>
              <p>Lambanog is a traditional Filipino distilled spirit made from the sap of the coconut palm. It is often referred to as "coconut vodka" due to its clear color and high alcohol content. It is a heritage drink that has been crafted by locals for generations, representing the ingenuity of Filipino farmers.</p>
              <br />
              <p>At Tropiko, we combine this authentic spirit with fresh fruit juices and coconut water to create a lighter, more refreshing experience.</p>
            </div>
          </div>

          <div className="highlight-block animate-on-scroll delay-100" style={{ borderLeftColor: 'var(--accent-orange)' }}>
            <div className="highlight-content">
              <h2 style={{ color: 'var(--accent-orange)' }}>Addressing the Misconceptions</h2>
              <p><strong>The Myth:</strong> There is a common misconception that Lambanog is dangerous or unsafe to drink. This fear stems from isolated incidents in the past involving unregulated, "backyard" distilleries that did not follow proper safety protocols.</p>
              <br />
              <p><strong>The Reality:</strong> Authentic, properly distilled Lambanog is perfectly safe. The danger comes only from unverified sources who cut corners. When sourced from credited manufacturers, Lambanog is a clean, premium spirit.</p>
            </div>
          </div>

          <div className="highlight-block animate-on-scroll delay-200">
            <div className="highlight-content">
              <h2>The Tropiko Standard</h2>
              <p>We take your safety seriously. Tropiko exclusively sources its Lambanog from <strong>credited, FDA-approved suppliers</strong> who adhere to strict distillation standards.</p>
              <br />
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-dark)' }}>
                <li><strong>Credited Suppliers:</strong> We do not use backyard sources. Our partners are fully licensed professionals.</li>
                <li><strong>Lab Tested:</strong> We are committed to validating product safety and quality through lab testing with the Food and Nutrition Research Institute (FNRI).</li>
                <li><strong>Food Safe:</strong> Every batch is handled in compliance with food safety regulations to ensure a clean, safe, and delicious sip every time.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding">
        <div className="section-header animate-on-scroll center-text">
          <h2>Have Questions?</h2>
          <p>We believe in transparency. Reach out to us.</p>
        </div>
        <div className="contact-box animate-on-scroll delay-100">
          <div className="contact-item">
            <h3>Business Inquiries</h3>
            <a href="mailto:tropiko.ph.business@gmail.com">tropiko.ph.business@gmail.com</a>
          </div>
          <div className="contact-item">
            <h3>Phone Number</h3>
            <a href="tel:+6309953718983">+63 09953718983</a>
          </div>
        </div>
      </section>
    </main>
  );
}