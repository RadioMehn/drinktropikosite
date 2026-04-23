'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  return (
    <header id="main-header">
      <div className="logo">
        <Link href="/" onClick={closeNav}>
          <img src="/images/logo.png" alt="Tropiko Logo" />
        </Link>
      </div>
      <nav>
        <ul className={`nav-links ${navActive ? 'nav-active' : ''}`}>
          <li><Link href="/" onClick={closeNav}>Home</Link></li>
          <li><Link href="/about" onClick={closeNav}>About Us</Link></li>
          <li><Link href="/lambanog" onClick={closeNav}>Lambanog 101</Link></li>
          <li><Link href="/#catalogue" onClick={closeNav}>Catalogue</Link></li>
          <li><Link href="#contact" onClick={closeNav}>Contact</Link></li>
          <li><Link href="/shop" className="nav-cta" onClick={closeNav}>Shop</Link></li>
        </ul>
        <div className={`burger ${navActive ? 'toggle' : ''}`} onClick={toggleNav}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
}