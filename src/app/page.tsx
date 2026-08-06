'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.05 }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section id="landing" className="section-padding">
        <div className="hero-container">
          <div className="hero-text animate-on-scroll">
            <h1>Experience <span className="text-gradient">Paradise</span> In Every Sip.</h1>
            <p className="hero-sub">
              Meet the flavors that define summer: <strong>Piña Paradise</strong> and the all-new <strong>Pakwan Punch</strong>. 
              Lambanog-infused hard seltzers for the golden hour.
            </p>
            <div className="btn-group">
              <Link href="/shop" className="btn btn-primary">Shop Flavors</Link>
              <Link href="/about" className="btn btn-outline">Our Story</Link>
            </div>
          </div>
          
          <div className="hero-visual animate-on-scroll delay-100">
            {/* Added flexbox styling to cleanly display both bottles side-by-side */}
            <div className="hero-products" style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src="/pina-paradise-cropped.webp"
                alt="Piña Paradise Bottle"
                className="hero-img"
                width={350}
                height={350}
                priority={true}
                style={{ objectFit: 'contain' }}
              />
              <Image
                src="/pakwan-punch-cropped.webp"
                alt="Pakwan Punch Bottle"
                className="hero-img"
                width={350}
                height={350}
                priority={true}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding center-text" style={{ background: "var(--bg-white)" }}>
        <div className="section-header animate-on-scroll">
          <h2>Why Sip <span className="text-gradient">Tropiko?</span></h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item animate-on-scroll delay-100">
            <div className="benefit-icon">🥥</div>
            <h3>Natural Electrolytes</h3>
            <p>Infused with real coconut water to keep you hydrated while you celebrate.</p>
          </div>
          <div className="benefit-item animate-on-scroll delay-100">
            <div className="benefit-icon">🍃</div>
            <h3>Flavored by Natural Fruits</h3>
            <p>Using the natural sweetness of fresh fruit and palm spirit.</p>
          </div>
          <div className="benefit-item animate-on-scroll delay-100">
            <div className="benefit-icon">🇵🇭</div>
            <h3>100% Filipino Crafted</h3>
            <p>Sourced from local farmers in Luzon.</p>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about-summary" className="section-padding center-text" style={{ background: "linear-gradient(to bottom, var(--bg-white), var(--payment-bg))" }}>
        <div className="section-header animate-on-scroll">
          <h2>The Tropiko Vibe</h2>
          <p style={{ maxWidth: '750px', margin: '20px auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Tropiko highlights Filipino flavors through a unique Lambanog hard seltzer infused with coconut water and fresh fruits.
          </p>
          <Link href="/about" className="btn btn-primary" style={{ marginTop: '20px' }}>Read Our Full Story</Link>
        </div>
      </section>
    </main>
  );
}