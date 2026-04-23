'use client';

import { useEffect } from 'react';

export default function About() {
  
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
          <h1>Our Story</h1>
          <p>Highlighting Filipino flavors through Lambanog hard seltzer.</p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#f9fdfb' }}>
        <div className="about-container">
          
          <div className="highlight-block animate-on-scroll">
            <div className="highlight-content">
              <h2>Our Vision</h2>
              <p>To become the leading ready-to-drink lambanog infused hard seltzer that offers young adults a uniquely Filipino, refreshing and convenient way to enjoy alcoholic beverages within the Philippines.</p>
            </div>
          </div>

          <div className="highlight-block animate-on-scroll delay-100">
            <div className="highlight-content">
              <h2>Our Mission</h2>
              <p>Tropiko aims to provide Gen-Zs and working professionals in the Philippines a better-for-you and uniquely crafted drink through our Ready-to-Drink (RTD) lambanog-infused hard seltzer made with the latest technology. Unlike ordinary mixes, Tropiko contains less added sugar as well as the added benefits of coconut water.</p>
              <br />
              <p>We are committed to crafting authentic Filipino tropical flavors that spark unforgettable connections and bring people together – while driving sustainable growth and care for the planet. We believe our employees are our most valuable assets who can turn Tropiko’s vision into reality.</p>
            </div>
          </div>

          <div className="highlight-block animate-on-scroll delay-200">
            <div className="highlight-content">
              <h2>Who We Are</h2>
              <p>We are a flexible, trend-aware Gen-Z team focused on bringing an authentic Filipino drinking experience to a growing market. By combining traditional lambanog with the hydrating properties of coconut water, we have created a product that is both culturally resonant and refreshing.</p>
              <br />
              <p>We are committed to supporting local farmers and producers by sourcing natural ingredients locally, ensuring our product highlights the best of Filipino flavors.</p>
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="section-padding">
        <div className="section-header animate-on-scroll">
          <h2>Contact Details</h2>
          <p>Reach out to the team.</p>
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