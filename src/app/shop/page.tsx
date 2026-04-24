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
  
  const [selections, setSelections] = useState<{ [key: string]: string }>({
    pina: 'single' 
  });

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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

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
                
                <Image 
                  src={prod.image} 
                  alt={prod.name} 
                  width={100} 
                  height={100} 
                  className="shop-thumb" 
                  style={{ objectFit: 'contain' }}
                />
                
                <div className="shop-details" style={{ textAlign: 'left' }}>
                  <h3 style={{ marginBottom: '5px' }}>{prod.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '5px' }}>{prod.desc}</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-green)', marginBottom: '10px' }}>{prod.abv}</p>
                  
                  <select 
                    className="size-selector" 
                    value={selections[prod.id]} 
                    onChange={(e) => setSelections({...selections, [prod.id]: e.target.value})}
                  >
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
                    
                    <div style={{ flex: 1, paddingRight: '10px', textAlign: 'left' }}>
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
            
            <button className="btn btn-primary full-width" style={{ marginTop: '20px' }} onClick={() => setIsCheckoutModalOpen(true)}>Checkout</button>
          </div>
        </div>
      </section>
    </main>
  );
}