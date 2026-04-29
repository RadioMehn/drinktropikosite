'use client';

import { useState, useEffect } from 'react'; // Added useEffect
import Image from 'next/image';

const products = [{
  id: 'pina',
  name: "Piña Paradise",
  flavor: "Pineapple & Coconut",
  abv: "5% ABV", 
  prices: { single: 150, pack: 590 },
  image: "/pina-paradise-cropped.webp",
  desc: "The classic tropical duo, reimagined."
}];

export default function Shop() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', location: '' });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ADDED ANIMATION STATE ---
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Triggers the animation a split second after the page loads
    setIsMounted(true);
  }, []);

  const [selections, setSelections] = useState<{ [key: string]: string }>({
    pina: 'single' 
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const addToCart = (product: any) => {
    const size = selections[product.id];
    const price = product.prices[size];
    const cartId = `${product.id}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => item.cartId === cartId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { cartId, name: product.name, sizeLabel: size === 'single' ? 'Single Bottle' : '4-Pack', price, qty: 1 }];
    });
  };

  const updateQty = (cartId: string, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        return { ...item, qty: item.qty + change };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        alert("File too large! Proof of payment must be 5MB or smaller.");
        e.target.value = ""; 
        return;
      }
      setProofFile(file);
    } else {
      setProofFile(null);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Strict guard: File upload is mandatory
    if (!proofFile) {
      return alert("Please upload proof of payment.");
    }

    // 2. Strict guard: Philippine phone number format (09 followed by 9 digits)
    const phPhoneRegex = /^09\d{9}$/;
    if (!phPhoneRegex.test(customerInfo.phone)) {
      return alert("Please enter a valid 11-digit Philippine phone number starting with 09.");
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', customerInfo.name);
      formData.append('email', customerInfo.email);
      
      // 3. Convert to +63 format before sending to Google Sheets
      const formattedPhone = `+63${customerInfo.phone.substring(1)}`; 
      formData.append('phone', formattedPhone);
      
      formData.append('location', customerInfo.location);
      formData.append('orderSummary', JSON.stringify(cart));
      formData.append('file', proofFile);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Order submitted! We'll verify your payment soon.");
        setCart([]);
        setCustomerInfo({ name: '', email: '', phone: '', location: '' });
        setIsCheckoutModalOpen(false);
      } else {
        throw new Error("Failed to submit order.");
      }
    } catch (error) {
      alert("There was an error. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

   {/* --- ADDED ANIMATION CLASSES TO MAIN TAG --- */}
  return (
    <main className={`page-wrapper animate-on-scroll ${isMounted ? 'visible' : ''}`}>
      <section id="shop" className="section-padding">
        <div className="section-header center-text" style={{ marginBottom: '40px' }}>
          <h1>Order Online</h1>
          <p>Get Tropiko delivered to your door.</p>
        </div>
        
        <div className="shop-layout">
          <div className="product-list">
            {products.map(prod => (
              <div className="shop-item" key={prod.id}>
                <Image src={prod.image} alt={prod.name} width={100} height={100} className="shop-thumb" style={{ objectFit: 'contain' }} />
                <div className="shop-details">
                  <h3>{prod.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '5px' }}>{prod.desc}</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-green)', marginBottom: '10px' }}>{prod.abv}</p>
                  <select className="size-selector" value={selections[prod.id]} onChange={(e) => setSelections({...selections, [prod.id]: e.target.value})}>
                    <option value="single">Single Bottle - ₱{prod.prices.single}</option>
                    <option value="pack">4-Pack - ₱{prod.prices.pack}</option>
                  </select>
                </div>
                <div className="shop-actions">
                  <button className="btn btn-primary" onClick={() => addToCart(prod)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-sidebar glass-panel sticky-cart">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Your Cart</h3>
              {cart.length > 0 && (
                <button 
                  onClick={() => setCart([])} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#ff7675', 
                    cursor: 'pointer', 
                    fontSize: '0.85rem', 
                    fontWeight: 500, 
                    textDecoration: 'underline' 
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            <div id="cart-items">
              {cart.length === 0 ? <p className="empty-msg" style={{ color: 'var(--text-light)' }}>Your cart is thirsty.</p> : (
                cart.map(item => (
                  <div className="cart-item" key={item.cartId}>
                    <div className="cart-item-info">
                      <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.name} x{item.qty}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{item.sizeLabel}</div>
                    </div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.cartId, -1)}>−</button>
                      <button className="qty-btn" onClick={() => updateQty(item.cartId, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>₱{cartTotal.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary full-width" style={{ marginTop: '20px' }} onClick={() => setIsCheckoutModalOpen(true)} disabled={cart.length === 0}>
              Checkout
            </button>
          </div>
        </div>
      </section>

      {/* Checkout Modal content remains the same... */}
      {isCheckoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ maxWidth: '600px' }}>
            <h2>Checkout</h2>
            <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-light)' }}>Please provide your details and payment proof.</p>
            
            <form onSubmit={handleSubmitOrder} className="checkout-form">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={customerInfo.name} 
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={customerInfo.email} 
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} 
              />
              <input 
                type="tel" 
                placeholder="Phone Number (e.g., 0917...)" 
                required 
                pattern="^09\d{9}$"
                title="Please enter a valid 11-digit Philippine phone number starting with 09"
                value={customerInfo.phone} 
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Delivery Address / Location" 
                required 
                value={customerInfo.location} 
                onChange={(e) => setCustomerInfo({...customerInfo, location: e.target.value})} 
              />
              
              <div className="payment-section">
                <h3>Total to Pay: <span className="highlight">₱{cartTotal.toLocaleString()}</span></h3>
                
                <div className="payment-qr-grid">
                  <div className="qr-option">
                    <Image src="/gcash-qr.jpg" alt="GCash QR" width={150} height={150} className="qr-img" priority />
                    <p><strong>GCash</strong></p>
                    <p>0917 581 0057</p>
                  </div>
                  <div className="qr-option">
                    <Image src="/maya-qr.jpg" alt="Maya QR" width={150} height={150} className="qr-img" priority />
                    <p><strong>Maya</strong></p>
                    <p>0917 581 0057</p>
                  </div>
                </div>
              </div>

              <div className="file-input-group">
                <label style={{ fontSize: '0.85rem' }}>Upload Proof of Payment (Max 5MB)</label>
                <input type="file" accept="image/*" required onChange={handleFileChange} />
              </div>

              <div className="btn-group">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Confirm Order'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setIsCheckoutModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}