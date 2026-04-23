'use client'; // <-- This tells Next.js this page uses interactive browser features

import Link from 'next/link';
import { useEffect } from 'react';

// The products array exclusively features Piña Paradise
const products = [
  {
    id: 'pina',
    name: "Piña Paradise",
    flavor: "Pineapple & Coconut",
    abv: "5% ABV", 
    image: "/pina-paradise-cropped.webp", //
    bgColor: "#FFF59D", 
  }
];

export default function Home() {
  
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

    return () => observer.disconnect(); // Cleans up the observer when you leave the page
  }, []);
  // -----------------------------------

  return (
    <main>
      <section id="landing" className="section-padding">
        <div className="hero-container">
          <div className="hero-text animate-on-scroll">
            <h1>Experience <span className="highlight">Paradise</span> In Every Sip.</h1>
            <p className="hero-sub">
              Meet the taste that defines summer. 
              <strong>Piña Paradise</strong>.
              Lambanog-infused hard seltzer for the golden hour.
            </p>
            <div className="btn-group">
              <Link href="/shop" className="btn btn-primary">Shop Flavors</Link>
              <Link href="/about" className="btn btn-outline">Our Story</Link>
            </div>
          </div>
          
          <div className="hero-visual animate-on-scroll delay-100">
            <div className="hero-products">
              <img src="/pina-paradise-cropped.webp" alt="Piña Paradise Bottle" className="hero-img float-slow" />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-padding center-text" style={{ background: "white" }}>
        <div className="section-header animate-on-scroll">
          {/* We added the text-gradient here to tie it back to the hero section */}
          <h2>Why Sip <span className="text-gradient">Tropiko?</span></h2>
          <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>The better-for-you booze that hits different.</p>
        </div>
        
        <div className="benefits-grid">
          <div className="benefit-item animate-on-scroll delay-100">
            <div className="benefit-icon">🥥</div>
            <h3>Natural Electrolytes</h3>
            <p>Infused with real coconut water to keep you hydrated while you celebrate. Say goodbye to heavy hangovers.</p>
          </div>

          <div className="benefit-item animate-on-scroll delay-200">
            <div className="benefit-icon">🍃</div>
            <h3>Less Sugar, More Fun</h3>
            <p>Unlike heavy beers or sugary cocktails, we keep it light. Just the natural sweetness of fruit and palm spirit.</p>
          </div>

          <div className="benefit-item animate-on-scroll delay-300">
            {/* Swapped the text back to the Philippine flag emoji for consistency */}
            <div className="benefit-icon">🇵🇭</div>
            <h3>100% Filipino Crafted</h3>
            <p>Sourced from local farmers in the Philippines. Every bottle supports our agriculture and keeps the tradition alive.</p>
          </div>
        </div>
      </section>

      {/* Added a subtle gradient to break up the white background */}
      <section id="about-summary" className="section-padding center-text" style={{ background: "linear-gradient(to bottom, white, #f0fff4)" }}>
        <div className="section-header animate-on-scroll">
          <h2>The Tropiko Vibe</h2>
          <p style={{ maxWidth: '750px', margin: '20px auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Tropiko highlights Filipino flavors through a unique Lambanog hard seltzer infused with coconut water and fresh fruits. 
            We offer a light, refreshing, and playful drink that supports local farmers and authentic Filipino culture.
          </p>
          {/* Changed this to a solid primary button so it draws the eye */}
          <Link href="/about" className="btn btn-primary" style={{ marginTop: '15px' }}>Read Our Full Story</Link>
        </div>
      </section>

      <section id="catalogue" className="section-padding">
        <div className="section-header animate-on-scroll">
          <h2>The Lineup</h2>
          <p>Our signature tropical flavor.</p>
        </div>
        <div className="catalogue-grid" id="catalogue-container">
          {products.map((prod) => (
            <div className="product-card animate-on-scroll" key={prod.id}>
              <div className="card-img-container" style={{ backgroundColor: `${prod.bgColor}40` }}>
                <img src={prod.image} alt={prod.name} className="prod-img" />
              </div>
              <div className="card-info">
                <h3>{prod.name}</h3>
                <span>{prod.flavor} | {prod.abv}</span>
                <Link href="/shop" className="btn btn-outline">Buy Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-padding" style={{ backgroundColor: "#f9fdfb" }}>
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