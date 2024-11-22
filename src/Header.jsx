import React from 'react';
import logo from './assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img 
            src={logo}
            alt="ArtSpace Logo" 
            className="logo-img"
          />
          <span className="logo-text">ArtSpace</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#auctions" className="nav-link">Auctions</a>
          <a href="#artists" className="nav-link">Artists</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search Artwork..." 
            className="search-input"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu">
          <button className="mobile-menu-btn">
            <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
