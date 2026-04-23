import Link from 'next/link';

// The products array now exclusively features Piña Paradise
const products = [
  {
    id: 'pina',
    name: "Piña Paradise",
    flavor: "Pineapple & Coconut",
    abv: "5% ABV", 
    image: "/pina-paradise-cropped.jpg",
    bgColor: "#FFF59D", 
  }
];

export default function Home() {
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
              {/* Updated image path to pull directly from the public folder */}
              <img src="/pina-paradise-cropped.jpg" alt="Piña Paradise Can" className="hero-img float-slow" />
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-padding" style={{ background: "white" }}>
        <div className="section-header animate-on-scroll">
          <h2>Why Sip Tropiko?</h2>
          <p>The better-for-you booze that hits different.</p>
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
            <div className="benefit-icon">🇵🇭</div>
            <h3>100% Filipino Crafted</h3>
            <p>Sourced from local farmers in Luzon. Every can supports our agriculture and keeps the tradition alive.</p>
          </div>
        </div>
      </section>

      <section id="about-summary" className="section-padding center-text">
        <div className="section-header animate-on-scroll">
          <h2>The Tropiko Vibe</h2>
          <p style={{ maxWidth: '700px', margin: '20px auto' }}>
            Tropiko highlights Filipino flavors through a unique Lambanog hard seltzer infused with coconut water and fresh fruits. 
            We offer a light, refreshing, and playful drink that supports local farmers and authentic Filipino culture.
          </p>
          <Link href="/about" className="btn btn-outline">Read Our Full Story</Link>
        </div>
      </section>

      <section id="catalogue" className="section-padding">
        <div className="section-header animate-on-scroll">
          <h2>The Lineup</h2>
          <p>Our signature tropical flavor.</p>
        </div>
        <div className="catalogue-grid" id="catalogue-container">
          {products.map((prod) => (
            <div className="product-card" key={prod.id}>
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
            <a href="tel:+6309178282004">+63 09178282004</a>
          </div>
        </div>
      </section>
    </main>
  );
}