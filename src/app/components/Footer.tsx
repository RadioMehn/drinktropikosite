'use client';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="brand">TROPIKO © {new Date().getFullYear()}</div>
        <div className="links">
          <a href="https://www.instagram.com/drinktropiko/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@drinktropiko" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
      <p className="disclaimer">Please Drink Responsibly. 18+</p>
    </footer>
  );
}