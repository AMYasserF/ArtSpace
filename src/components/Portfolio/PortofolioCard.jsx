import React from 'react';
import { useState } from 'react';
import '../../css/PortfolioCard.css';




const PortfolioCard = ({ art, onClick, onAuctionRequest ,onDelete }) => 
  {
    const [requestAuction , setRequestAuction] = useState(false);


  return (
    <div className="portfolio-card" onClick={() => onClick(art)}>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete(art); 
        }}
      >
        ✖
      </button>
      <img src={art.imageUrl} alt={art.title} className="portfolio-card-image" />
      <h3 className="portfolio-card-title">{art.title}</h3>
      <button
        className="request-auction-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card click event
          onAuctionRequest(art);
        }}
      >
        Request Auction
      </button>
    </div>
  );
};

export default PortfolioCard;
