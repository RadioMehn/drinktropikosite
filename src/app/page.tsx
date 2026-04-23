'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const products = [
  {
    id: 'pina',
    name: "Piña Paradise",
    flavor: "Pineapple & Coconut",
    abv: "5% ABV",
    image: "/pina-paradise-cropped.webp",
    bgColor: "#FFF59D",
    desc: "The classic tropical duo, reimagined. A light and refreshing blend of naturally sweet pineapples and smooth coconut water, balanced with heritage lambanog spirit."
  }
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section id="landing" className="section-padding">
        <div className="hero-container">
          <div className="hero-text animate-on-scroll">
            <h1>Experience <span className="text-gradient">Paradise</span> In Every Sip.</h1>
            <p className="hero-sub">
              Meet the taste that defines summer. <strong>Piña Paradise</strong>. 
              Lambanog-infused hard seltzer for the golden hour.
            </p>
            <div className="btn-group">
              <Link href="/shop" className="btn btn-primary">Shop Flavors</Link>
              <Link href="/about" className="btn btn-outline">Our Story</Link>
            </div>
          </div>
          <div className="hero-visual animate-on-scroll delay-100">
            <div className="hero-products">
              <Image
                src="/pina-paradise-cropped.webp"
                alt="Piña Paradise Bottle"
                className="hero-img"
                width={500}
                height={500}
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-padding center-text" style={{ background: "white" }}>
        <div className="section-header animate-on-scroll">
          <h2>Why Sip <span className="text-gradient">Tropiko?</span></h2>
          <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>The better-for-you booze that hits different.</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item animate-on-scroll delay-100">
            <div className="benefit-icon">🥥</div>
            <h3>Natural Electrolytes</h3>
            <p>Infused with real coconut water to keep you hydrated while you celebrate.</p>
          </div>
          <div className="benefit-item animate-on-scroll delay-200">
            <div className="benefit-icon">🍃</div>
            <h3>Less Sugar, More Fun</h3>
            <p>Just the natural sweetness of fruit and palm spirit.</p>
          </div>
          <div className="benefit-item animate-on-scroll delay-300">
            <div className="benefit-icon">🇵🇭</div>
            <h3>100% Filipino Crafted</h3>
            <p>Sourced from local farmers in Luzon.</p>
          </div>
        </div>
      </section>

      <section id="about-summary" className="section-padding center-text" style={{ background: "linear-gradient(to bottom, white, #f0fff4)" }}>
        <div className="section-header animate-on-scroll">
          <h2>The Tropiko Vibe</h2>
          <p style={{ maxWidth: '750px', margin: '20px auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Tropiko highlights Filipino flavors through a unique Lambanog hard seltzer infused with coconut water and fresh fruits.
          </p>
          <Link href="/about" className="btn btn-primary">Read Our Full Story</Link>
        </div>
      </section>

      <section id="catalogue" className="section-padding">
  <div className="section-header animate-on-scroll">
    <h2>Discover <span className="text-gradient">The Lineup</span></h2>
  </div>
  
  <div className="catalogue-showcase">
    {products.map((prod) => (
      <div className="product-card-premium animate-on-scroll" key={prod.id}>
        
        {/* Yellow Block (Image Container) */}
        <div className="showcase-img-container">
          <Image 
            src={prod.image} 
            alt={prod.name} 
            width={350} 
            height={350} 
            className="showcase-prod-img"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* White Block (Info Container) */}
        <div className="showcase-info">
          <h3 className="text-gradient">{prod.name}</h3>
          <p className="showcase-flavor-desc">{prod.desc}</p>
          <div style={{ marginBottom: '25px' }}>
            <span style={{ background: '#f0fff4', padding: '6px 12px', borderRadius: '15px' }}>
              {prod.flavor} | {prod.abv}
            </span>
          </div>
          <Link href="/shop" className="btn btn-primary">Buy Now</Link>
        </div>

      </div>
    ))}
  </div>
</section>
    </main>
  );
}