'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// THE FIX: Added Pakwan Punch and the new "case" pricing to the products array
const products = [
  {
    id: 'pina',
    name: "Piña Paradise",
    flavor: "Pineapple & Coconut",
    abv: "5% ABV", 
    prices: { single: 160, pack: 630, case: 3780 },
    image: "/pina-paradise-cropped.webp",
    desc: "The classic tropical duo, reimagined."
  },
  {
    id: 'pakwan',
    name: "Pakwan Punch",
    flavor: "Watermelon & Coconut",
    abv: "5% ABV", 
    prices: { single: 160, pack: 630, case: 3780 },
    image: "/pakwan-punch-cropped.webp",
    desc: "A refreshing splash of summer."
  }
];

export default function Shop() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({ 
    email: '', 
    firstName: '', 
    lastName: '', 
    company: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    region: 'Metro Manila (NCR)',
    phone: '' 
  });
  
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // THE FIX: Initialized the default selection for both products
  const [selections, setSelections] = useState<{ [key: string]: string }>({
    pina: 'single',
    pakwan: 'single'
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const addToCart = (product: any) => {
    const size = selections[product.id];
    const price = product.prices[size as keyof typeof product.prices];
    const cartId = `${product.id}-${size}`;

    // THE FIX: Added dynamic sizing labels to account for the Case of 24
    const sizeLabels: { [key: string]: string } = {
      single: 'Single Bottle',
      pack: '4-Pack',
      case: 'Case of 24'
    };

    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => item.cartId === cartId ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { cartId, name: product.name, sizeLabel: sizeLabels[size], price, qty: 1 }];
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
    
    if (!proofFile) {
      return alert("Please upload proof of payment.");
    }

    const phPhoneRegex = /^09\d{9}$/;
    if (!phPhoneRegex.test(customerInfo.phone)) {
      return alert("Please enter a valid 11-digit Philippine phone number starting with 09.");
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      const fullName = `${customerInfo.firstName} ${customerInfo.lastName}`.trim();
      const fullAddress = [
        customerInfo.company,
        customerInfo.address,
        customerInfo.apartment,
        customerInfo.city,
        customerInfo.region,
        customerInfo.postalCode,
        'Philippines'
      ].filter(val => val && val.trim() !== '').join(', ');

      formData.append('name', fullName);
      formData.append('email', customerInfo.email);
      
      const formattedPhone = `+63${customerInfo.phone.substring(1)}`; 
      formData.append('phone', formattedPhone);
      
      formData.append('location', fullAddress);
      formData.append('orderSummary', JSON.stringify(cart));
      formData.append('file', proofFile);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Order submitted! We'll verify your payment soon.");
        setCart([]);
        setCustomerInfo({ 
          email: '', firstName: '', lastName: '', company: '', 
          address: '', apartment: '', postalCode: '', city: '', region: 'Metro Manila (NCR)', phone: '' 
        });
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

  return (
    <main className="page-wrapper">
      <section id="shop" className={`section-padding animate-on-scroll ${isMounted ? 'visible' : ''}`}>
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
                  
                  {/* THE FIX: Added the "Case of 24" option to the dropdown menu */}
                  <select className="size-selector" value={selections[prod.id]} onChange={(e) => setSelections({...selections, [prod.id]: e.target.value})}>
                    <option value="single">Single Bottle - ₱{prod.prices.single}</option>
                    <option value="pack">4-Pack - ₱{prod.prices.pack}</option>
                    <option value="case">Case of 24 - ₱{prod.prices.case}</option>
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
                  style={{ background: 'none', border: 'none', color: '#ff7675', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'underline' }}
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

      {/* Checkout Modal Content */}
      {isCheckoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '5px' }}>Checkout</h2>
            <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-light)' }}>Please provide your shipping details.</p>
            
            <form onSubmit={handleSubmitOrder} className="checkout-form">
              
              <div style={{ background: 'var(--payment-bg)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 15px 0', color: 'var(--text-dark)' }}>Contact Information</h3>
                <input type="email" placeholder="Email Address" required value={customerInfo.email} onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} style={{ width: '100%', marginBottom: '10px', boxSizing: 'border-box' }} />
                <input type="tel" placeholder="Phone Number (e.g., 0917...)" required pattern="^09\d{9}$" title="Please enter a valid 11-digit Philippine phone number starting with 09" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} style={{ width: '100%', marginBottom: '0', boxSizing: 'border-box' }} />
              </div>

              <div style={{ background: 'var(--payment-bg)', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 15px 0', color: 'var(--text-dark)' }}>Delivery Address</h3>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input style={{ width: '100%', margin: 0, boxSizing: 'border-box' }} type="text" placeholder="First name" required value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} />
                  <input style={{ width: '100%', margin: 0, boxSizing: 'border-box' }} type="text" placeholder="Last name" required value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} />
                </div>

                <input type="text" placeholder="Company (optional)" value={customerInfo.company} onChange={e => setCustomerInfo({...customerInfo, company: e.target.value})} style={{ width: '100%', marginBottom: '10px', boxSizing: 'border-box' }} />
                <input type="text" placeholder="Address" required value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} style={{ width: '100%', marginBottom: '10px', boxSizing: 'border-box' }} />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" value={customerInfo.apartment} onChange={e => setCustomerInfo({...customerInfo, apartment: e.target.value})} style={{ width: '100%', marginBottom: '10px', boxSizing: 'border-box' }} />

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input style={{ width: '100%', margin: 0, boxSizing: 'border-box' }} type="text" placeholder="Postal code" required value={customerInfo.postalCode} onChange={e => setCustomerInfo({...customerInfo, postalCode: e.target.value})} />
                  <input style={{ width: '100%', margin: 0, boxSizing: 'border-box' }} type="text" placeholder="City" required value={customerInfo.city} onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})} />
                </div>

                <select value={customerInfo.region} onChange={e => setCustomerInfo({...customerInfo, region: e.target.value})} style={{ width: '100%', marginBottom: '0', boxSizing: 'border-box' }}>
                  <option value="Metro Manila (NCR)">Metro Manila (NCR)</option>
                  <option value="Cordillera Administrative Region (CAR)">Cordillera Administrative Region (CAR)</option>
                  <option value="Ilocos Region (Region I)">Ilocos Region (Region I)</option>
                  <option value="Cagayan Valley (Region II)">Cagayan Valley (Region II)</option>
                  <option value="Central Luzon (Region III)">Central Luzon (Region III)</option>
                  <option value="CALABARZON (Region IV-A)">CALABARZON (Region IV-A)</option>
                  <option value="MIMAROPA (Region IV-B)">MIMAROPA (Region IV-B)</option>
                  <option value="Bicol Region (Region V)">Bicol Region (Region V)</option>
                  <option value="Western Visayas (Region VI)">Western Visayas (Region VI)</option>
                  <option value="Central Visayas (Region VII)">Central Visayas (Region VII)</option>
                  <option value="Eastern Visayas (Region VIII)">Eastern Visayas (Region VIII)</option>
                  <option value="Zamboanga Peninsula (Region IX)">Zamboanga Peninsula (Region IX)</option>
                  <option value="Northern Mindanao (Region X)">Northern Mindanao (Region X)</option>
                  <option value="Davao Region (Region XI)">Davao Region (Region XI)</option>
                  <option value="SOCCSKSARGEN (Region XII)">SOCCSKSARGEN (Region XII)</option>
                  <option value="Caraga (Region XIII)">Caraga (Region XIII)</option>
                  <option value="Bangsamoro (BARMM)">Bangsamoro (BARMM)</option>
                </select>
              </div>
              
              <div className="payment-section">
                <h3>Total to Pay: <span className="highlight">₱{cartTotal.toLocaleString()}</span></h3>
                
                <div className="payment-qr-grid">
                  <div className="qr-option">
                    <img src="/gcash-qr.jpg" alt="GCash QR" style={{ width: '150px', height: 'auto', maxHeight: '180px', objectFit: 'contain', borderRadius: '8px' }} />
                    <p style={{ marginTop: '10px' }}><strong>GCash</strong></p>
                    <p>0927 823 1363</p>
                  </div>
                  <div className="qr-option">
                    <img src="/maya-qr.jpg" alt="Maya QR" style={{ width: '150px', height: 'auto', maxHeight: '180px', objectFit: 'contain', borderRadius: '8px' }} />
                    <p style={{ marginTop: '10px' }}><strong>Maya</strong></p>
                    <p>0927 823 1363</p>
                  </div>
                </div>
              </div>

              <div className="file-input-group">
                <label style={{ fontSize: '0.85rem' }}>Upload Proof of Payment (Max 5MB)</label>
                <input type="file" accept="image/*" required onChange={handleFileChange} style={{ boxSizing: 'border-box', width: '100%' }} />
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