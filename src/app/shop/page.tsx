'use client';

import { useState } from 'react';
import Image from 'next/image'; // 1. Imported the optimized Image component

const products = [
  {
    id: 'pina',
    name: "Piña Paradise",
    flavor: "Pineapple & Coconut",
    abv: "5% ABV", 
    prices: { single: 150, pack: 590 }, // Pricing updated
    image: "/pina-paradise-cropped.webp",
    desc: "The classic tropical duo, reimagined."
  }
];

export default function Shop() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // Cleaned up the default state to only include your active product
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
      // Updated the label to reflect the new 4-Pack packaging
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
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      alert("Checkout logic to be implemented here.");
  };

  return (
    <main className="page-wrapper">
      <section id="shop" className="section-padding">
        <div className="section-header">
          <h1>Order Online</h1>
          <p>Get Tropiko delivered to your door.</p>
        </div>
        
        <div className="shop-layout">
          <div className="product-list">
            {products.map(prod => (
              <div className="shop-item" key={prod.id}>
                {/* 2. Swapped to the Next.js Image component for bandwidth savings */}
                <Image 
                  src={prod.image} 
                  alt={prod.name} 
                  width={100} 
                  height={100} 
                  className="shop-thumb" 
                  style={{ objectFit: 'contain' }}
                />
                <div className="shop-details">
                  <h4>{prod.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px' }}>{prod.desc}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-green)', marginBottom: '8px' }}>{prod.abv}</p>
                  
                  <select 
                    className="size-selector" 
                    value={selections[prod.id]} 
                    onChange={(e) => setSelections({...selections, [prod.id]: e.target.value})}
                  >
                    {/* 3. Updated pricing and 4-pack terminology */}
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
            <h3>Your Cart</h3>
            <div id="cart-items">
              {cart.length === 0 ? <p className="empty-msg">Your cart is thirsty.</p> : (
                cart.map(item => (
                  <div className="cart-item" key={item.cartId}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{item.sizeLabel}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>₱{(item.price * item.qty).toLocaleString()}</div>
                    </div>
                    {/* The quantity controls here naturally inherit your smooth CSS styling */}
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.cartId, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.cartId, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span>₱{cartTotal.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary full-width" onClick={() => setIsCheckoutModalOpen(true)}>Checkout</button>
          </div>
        </div>
      </section>
    </main>
  );
}