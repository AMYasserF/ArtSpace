
import React from 'react'
import categories from './assets/images/ArtCategories.jpg'
import artists from './assets/images/Artists.jpg'
import auctions from './assets/images/auctions.jpg'
const HighlightsSection = () => {
  return (
    <section className="highlights">
      <div className="highlights-container">
        <div className="highlight-card">
          <img src={categories} alt="Categories" className="highlight-icon" />
          <h3 className="highlight-title">Categories</h3>
          <p className="highlight-description">Explore a wide range of art styles and genres.</p>
        </div>

        <div className="highlight-card">
          <img src={artists} alt="Artists" className="highlight-icon" />
          <h3 className="highlight-title">Featured Artists</h3>
          <p className="highlight-description">Discover the talent behind the artwork.</p>
        </div>

        <div className="highlight-card">
          <img src={auctions} alt="Auctions" className="highlight-icon" />
          <h3 className="highlight-title">Ongoing Auctions</h3>
          <p className="highlight-description">Participate in live auctions and bid on your favorite pieces.</p>
        </div>
      </div>
    </section>
  );
}

export default HighlightsSection;
