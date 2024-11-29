import React from 'react';
import logo from '../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

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
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
          <NavLink to="/auctions" className="nav-link">Auctions</NavLink>
          <NavLink to="/artists" className="nav-link">Artists</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
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
