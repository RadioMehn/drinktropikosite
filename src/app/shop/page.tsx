'use client';

import { useState } from 'react';

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
    oasis: 'single',
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
      return [...prev, { cartId, name: product.name, sizeLabel: size === 'single' ? 'Single' : '6-Pack', price, qty: 1 }];
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

  // Note: Add your Google Apps Script fetch logic to this function similar to your script.js
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // ... convert file to base64 and fetch(SCRIPT_URL)
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
                <img src={prod.image} alt={prod.name} className="shop-thumb" />
                <div className="shop-details">
                  <h4>{prod.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px' }}>{prod.desc}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary-green)', marginBottom: '8px' }}>{prod.abv}</p>
                  
                  <select 
                    className="size-selector" 
                    value={selections[prod.id]} 
                    onChange={(e) => setSelections({...selections, [prod.id]: e.target.value})}
                  >
                    <option value="single">Single Can - ₱{prod.prices.single}</option>
                    <option value="pack">6-Pack - ₱{prod.prices.pack}</option>
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
      
      {/* Implement Mobile Sticky Bar and Checkout Modal conditionally based on state */}
    </main>
  );
}