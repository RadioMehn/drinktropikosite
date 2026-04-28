'use client';

import { useState } from 'react';
import Image from 'next/image';

const products = [
  {
    id: 'pina',
    name: "Piña Paradise",
    flavor: "Pineapple & Coconut",
    abv: "5% ABV", 
    prices: { single: 150, pack: 590 },
    image: "/pina-paradise-cropped.webp",
    desc: "The classic tropical duo, reimagined."
  }
];

export default function Shop() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // --- 1. NEW FORM STATE ---
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // --- 2. FILE VALIDATION LOGIC (5MB LIMIT) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        alert("File too large! Proof of payment must be 5MB or smaller.");
        e.target.value = ""; 
        return;
      }
      setProofFile(file);
    }
  };

  // --- 3. ORDER SUBMISSION HANDLER ---
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) return alert("Please upload proof of payment.");

    setIsSubmitting(true);
    
    // Logic to prepare data for Google Sheets/Drive later
    console.log("Processing Order for:", customerInfo.name);
    
    // Simulate API call
    setTimeout(() => {
      alert("Order submitted! We'll verify your payment soon.");
      setCart([]);
      setIsCheckoutModalOpen(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <main className="page-wrapper">
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
                  <h3 style={{ marginBottom: '5px' }}>{prod.name}</h3>
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
            <h3 style={{ marginBottom: '20px' }}>Your Cart</h3>
            <div id="cart-items">
              {cart.length === 0 ? <p className="empty-msg" style={{ color: 'var(--text-light)' }}>Your cart is thirsty.</p> : (
                cart.map(item => (
                  <div className="cart-item" key={item.cartId}>
                    <div className="cart-item-info">
                      <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{item.sizeLabel}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>₱{(item.price * item.qty).toLocaleString()}</div>
                    </div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.cartId, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.cartId, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>Total:</span>
              <span>₱{cartTotal.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary full-width" style={{ marginTop: '20px' }} onClick={() => setIsCheckoutModalOpen(true)} disabled={cart.length === 0}>
              Checkout
            </button>
          </div>
        </div>
      </section>

      {/* --- 4. NEW CHECKOUT MODAL UI --- */}
      {isCheckoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <h2 style={{ marginBottom: '10px' }}>Checkout</h2>
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
                placeholder="Phone Number" 
                required 
                value={customerInfo.phone} 
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} 
              />
              
              <div className="payment-notice" style={{ background: '#f0fff4', padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total: ₱{cartTotal.toLocaleString()}</div>
                <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>GCash: 09XX XXX XXXX</div>
              </div>

              <div className="file-input-group">
                <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Proof of Payment (Max 5MB)</label>
                <input type="file" accept="image/*" required onChange={handleFileChange} />
              </div>

              <div className="btn-group" style={{ marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Confirm Order'}
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