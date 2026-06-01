'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes'; // <-- Imported

export default function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  // Theme toggle state
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header id="main-header">
      <div className="logo">
        <Link href="/" onClick={closeNav}>
          <Image src="/logo.svg" alt="Tropiko Logo" width={140} height={45} priority />
        </Link>
      </div>
      
      <nav>
        <ul className={`nav-links ${navActive ? 'nav-active' : ''}`}>
          <li><Link href="/" onClick={closeNav}>Home</Link></li>
          <li><Link href="/about" onClick={closeNav}>About Us</Link></li>
          <li><Link href="/lambanog" onClick={closeNav}>Lambanog 101</Link></li>
          <li><Link href="/catalogue" onClick={closeNav}>Catalogue</Link></li>
          <li><Link href="/contact" onClick={closeNav}>Contact</Link></li>
          <li><Link href="/shop" className="nav-cta" onClick={closeNav}>Shop</Link></li>
        </ul>
        
        <div className="nav-controls">
          {/* Ensure the button only renders after mounting to avoid hydration mismatch */}
          {mounted && (
            <button 
              className="theme-toggle" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}

          <div className={`burger ${navActive ? 'toggle' : ''}`} onClick={toggleNav}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}