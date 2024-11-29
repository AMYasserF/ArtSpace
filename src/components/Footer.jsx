import React from 'react';




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <h3 className="footer-title">ArtSpace</h3>
          <ul className="footer-nav">
            <li><a href="#about" className="footer-link">About Us</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
            <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
            <li><a href="#terms" className="footer-link">Terms of Use</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a className="social-icon">
            <i className="fa-brands fa-instagram"></i>
            </a>
            <a  className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a  className="social-icon">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-text">© 2024 ArtSpace. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
