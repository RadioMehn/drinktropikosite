'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AgeGate() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user has already verified their age in a previous session
    const verified = localStorage.getItem('tropiko-verified');
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  const handleVerify = (over18: boolean) => {
    if (over18) {
      localStorage.setItem('tropiko-verified', 'true');
      setIsVerified(true);
    } else {
      // Redirect underage users elsewhere, like Google
      window.location.href = "https://www.google.com";
    }
  };

  // While checking localStorage, render nothing to prevent a flash of content
  if (isVerified === null || isVerified === true) return null;

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-content animate-on-scroll visible">
        <div className="age-gate-logo">
           {/* Branding the gate to match Tropiko's aesthetic */}
           <Image src="/logo.png" alt="Tropiko Logo" width={180} height={60} />
        </div>
        
        <h2>Welcome to Paradise.</h2>
        <p>You must be of legal drinking age to enter the Tropiko world. Are you 18 years or older?</p>
        
        <div className="gate-buttons">
          <button className="btn btn-primary" onClick={() => handleVerify(true)}>Yes, I am 18+</button>
          <button className="btn btn-outline" onClick={() => handleVerify(false)}>No, I am under 18</button>
        </div>
        
        <p className="disclaimer" style={{ marginTop: '30px' }}>
          Drink Responsibly.
        </p>
      </div>
    </div>
  );
}