'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);

  useEffect(() => {
    const isAdult = localStorage.getItem('isAdult');
    if (isAdult !== 'true') {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem('isAdult', 'true');
    setIsVisible(false);
    document.body.style.overflow = 'auto';
  };

  const handleNo = () => {
    setIsUnderage(true);
  };

  if (!isVisible) return null;

  return (
    <div className="age-gate-overlay" style={{ opacity: isVisible ? 1 : 0 }}>
      <div className="age-gate-content glass-panel">
        <h1>TROPIKO</h1>
        <p>Welcome to the island state of mind.</p>
        <h2>Are you 18 years of age or older?</h2>
        
        {!isUnderage ? (
          <div className="gate-buttons">
            <button onClick={handleYes} className="btn btn-primary">Yes, I am 18+</button>
            <button onClick={handleNo} className="btn btn-secondary">No, I am under 18</button>
          </div>
        ) : (
          <p className="underage-msg text-red-500 mt-4">Sorry, you must be of legal drinking age to enter.</p>
        )}
      </div>
    </div>
  );
}