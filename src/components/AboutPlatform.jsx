import React from 'react';
import logo from '../assets/images/logo.png'

const AboutPlatformSection = () => {
  return (
    <section className="about-platform">
      <div className="about-container">
        <div className="about-text">
          <h2 className="about-title">Welcome to ArtSpace</h2>
          <p className="about-description">
            ArtSpace is an innovative online platform designed to connect artists, art enthusiasts, and collectors. Whether you’re looking to discover breathtaking art, participate in exciting auctions, or showcase your own creations, ArtSpace offers a seamless experience for everyone.
          </p>
          <p className="about-description">
            Join our community of passionate art lovers and immerse yourself in a world where art thrives in all its forms.
          </p>
          <a href="#signup" className="cta-btn">Get Started</a>
        </div>

        <div className="about-image">
          <img 
            src={logo}
            alt="ArtSpace Platform"
            className="about-img"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPlatformSection;
