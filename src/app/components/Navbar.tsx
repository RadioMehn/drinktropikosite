'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  return (
    <header id="main-header">
      <div className="logo">
        <Link href="/" onClick={closeNav}>
          <Image 
            src="/logo.png" 
            alt="Tropiko Logo" 
            width={160} 
            height={50} 
            style={{ objectFit: 'contain' }}
            priority={true} 
          />
        </Link>
      </div>
      <nav>
        {/* The nav-active class is toggled here based on state */}
        <ul className={`nav-links ${navActive ? 'nav-active' : ''}`}>
          <li><Link href="/" onClick={closeNav}>Home</Link></li>
          <li><Link href="/about" onClick={closeNav}>About Us</Link></li>
          <li><Link href="/lambanog" onClick={closeNav}>Lambanog 101</Link></li>
          <li><Link href="/#catalogue" onClick={closeNav}>Catalogue</Link></li>
          <li><Link href="/contact" onClick={closeNav}>Contact</Link></li>
          <li><Link href="/shop" className="nav-cta" onClick={closeNav}>Shop</Link></li>
        </ul>

        {/* The burger div must be inside the nav to align with your CSS */}
        <div className={`burger ${navActive ? 'toggle' : ''}`} onClick={toggleNav}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
}