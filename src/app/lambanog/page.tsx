'use client';

import { useEffect } from 'react';
import Image from 'next/image'; // <-- Added the Image component import!

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

      <section className="section-padding">
        <div className="about-container">
          
          {/* Block 1: What is Lambanog? */}
          <div className="highlight-block animate-on-scroll">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
              <div className="highlight-content" style={{ flex: '1 1 350px' }}>
                <h2>What is Lambanog?</h2>
                <p>Lambanog is a traditional Filipino distilled spirit made from the sap of the coconut palm. It is often referred to as "coconut vodka" due to its clear color and high alcohol content. It is a heritage drink that has been crafted by locals for generations, representing the ingenuity of Filipino farmers.</p>
              </div>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
                <Image src="/12.svg" alt="What is Lambanog" width={500} height={625} style={{ width: '100%', maxWidth: '380px', height: 'auto', borderRadius: '16px', boxShadow: 'var(--shadow)' }} />
              </div>
            </div>
          </div>

          {/* Block 2: Deep Local Roots */}
          <div className="highlight-block animate-on-scroll delay-100">
            {/* wrap-reverse ensures the image stays on top of the text on mobile screens */}
            <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center' }}>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
                <Image src="/13.svg" alt="Introduction to Lambanog" width={500} height={625} style={{ width: '100%', maxWidth: '380px', height: 'auto', borderRadius: '16px', boxShadow: 'var(--shadow)' }} />
              </div>
              <div className="highlight-content" style={{ flex: '1 1 350px' }}>
                <h2>Deep Local Roots</h2>
                <p>Originating primarily from the province of Quezon, this potent liquor contains around 40-45% ABV in its traditional form. It has always been a symbol of celebration, often enjoyed during fiestas and community gatherings.</p>
                <br />
                <p>At Tropiko, we honor this tradition while adapting it for the modern palate. We combine the authentic spirit with fresh fruit juices and coconut water to create a lighter, highly refreshing experience.</p>
              </div>
            </div>
          </div>

          {/* Block 3: The Process */}
          <div className="highlight-block animate-on-scroll delay-200">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
              <div className="highlight-content" style={{ flex: '1 1 350px' }}>
                <h2>The Crafting Process</h2>
                <p>Creating premium lambanog is a labor of love that requires patience and expertise.</p>
                <br />
                <p>It starts high up in the coconut trees, where farmers tap unopened flowers to collect fresh sap. This sweet nectar is naturally fermented and then carefully distilled. The most crucial step is discarding the harsh, toxic "heads" of the distillation, capturing only the pure, smooth middle cut to ensure the highest quality and safety.</p>
              </div>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
                <Image src="/14.svg" alt="The Crafting Process" width={500} height={625} style={{ width: '100%', maxWidth: '380px', height: 'auto', borderRadius: '16px', boxShadow: 'var(--shadow)' }} />
              </div>
            </div>
          </div>

          {/* Block 4: Addressing Misconceptions */}
          <div className="highlight-block animate-on-scroll" style={{ borderLeftColor: 'var(--accent-orange)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '40px', alignItems: 'center' }}>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
                <Image src="/15.svg" alt="Premium vs Backyard Lambanog" width={500} height={625} style={{ width: '100%', maxWidth: '380px', height: 'auto', borderRadius: '16px', boxShadow: 'var(--shadow)' }} />
              </div>
              <div className="highlight-content" style={{ flex: '1 1 350px' }}>
                <h2 style={{ color: 'var(--accent-orange)' }}>Addressing the Misconceptions</h2>
                <p><strong>The Myth:</strong> There is a common misconception that Lambanog is dangerous to drink. This fear stems from isolated incidents involving unregulated, "backyard" distilleries that skip safety protocols.</p>
                <br />
                <p><strong>The Reality:</strong> Authentic, properly distilled Lambanog is perfectly safe. The danger comes only from unverified sources who cut corners and fail to filter out toxic methanol. When sourced from accredited manufacturers, Lambanog is a clean, highly regulated, premium spirit.</p>
              </div>
            </div>
          </div>

          {/* Block 5: The Tropiko Standard / Why we used it */}
          <div className="highlight-block animate-on-scroll delay-100">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
              <div className="highlight-content" style={{ flex: '1 1 350px' }}>
                <h2>The Tropiko Standard</h2>
                <p>While most spirits in the market today are imported, we are proud to champion our local agriculture. We chose Lambanog because we wanted to reimagine a heritage spirit into something approachable, keeping that authentic Filipino character while making it incredibly easy to sip.</p>
                <br />
                <ul style={{ listStylePosition: 'inside', color: 'var(--text-dark)', paddingLeft: '5px' }}>
                  <li style={{ marginBottom: '10px' }}><strong>FDA-Approved Suppliers:</strong> We exclusively partner with fully licensed professionals. No backyard sources.</li>
                  <li style={{ marginBottom: '10px' }}><strong>Lab Tested:</strong> Product safety and quality are rigorously validated.</li>
                  <li><strong>Food Safe:</strong> Handled in strict compliance with food regulations to guarantee a worry-free drink.</li>
                </ul>
              </div>
              <div style={{ flex: '1 1 350px', display: 'flex', justifyContent: 'center' }}>
                <Image src="/16.svg" alt="Why We Used Lambanog" width={500} height={625} style={{ width: '100%', maxWidth: '380px', height: 'auto', borderRadius: '16px', boxShadow: 'var(--shadow)' }} />
              </div>
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