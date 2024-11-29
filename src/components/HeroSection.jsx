import React from 'react';
import image from '../assets/images/Heroimage.png'
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Hero Image */}
        <div className="hero-image">
          <img 
            src={image}
            alt="Hero Artwork"
            className="hero-img"
          />
        </div>

        {/* Hero Text Section */}
        <div className="hero-text">
          <h1 className="hero-title">Welcome to ArtSpace</h1>
          <p className="hero-subtitle">Discover, Bid, and Explore the World of Art</p>
          <div className="cta-buttons">
            <NavLink to="/gallery" className="cta-btn cta-btn-gallery">Explore the Gallery</NavLink>
            <NavLink to="/auctions" className="cta-btn cta-btn-auctions">Join an Auction</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
