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

export default function Catalogue() {
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
    <main className="page-wrapper">
      <section className="section-padding">
        <div className="section-header animate-on-scroll center-text">
          <h1>Discover <span className="text-gradient">The Lineup</span></h1>
          <p>Our signature tropical flavor, crafted for the golden hour.</p>
        </div>
        
        <div className="catalogue-showcase" style={{ flexDirection: 'column', gap: '40px' }}>
          {products.map((prod) => (
            <div className="product-card-premium animate-on-scroll" key={prod.id}>
              
              <div className="showcase-img-container" style={{ backgroundColor: prod.bgColor }}>
                <Image 
                  src={prod.image} 
                  alt={prod.name} 
                  width={350} 
                  height={350} 
                  className="showcase-prod-img"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <div className="showcase-info">
                <h3 className="text-gradient">{prod.name}</h3>
                <p className="showcase-flavor-desc">{prod.desc}</p>
                <div style={{ marginBottom: '25px' }}>
                  <span style={{ background: '#f0fff4', padding: '6px 16px', borderRadius: '15px', fontWeight: '500' }}>
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