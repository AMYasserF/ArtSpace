import React from 'react';




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <h3 className="footer-title">ArtSpace</h3>
          <ul className="footer-nav">
            <li><a href="#about" className="footer-link">About Us</a></li>
          </ul>
        </div>
      </div>


      <div className="footer-bottom">
        <p className="footer-text">© 2024 ArtSpace. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;