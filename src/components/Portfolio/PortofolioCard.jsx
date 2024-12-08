import React from 'react';
import { useState } from 'react';
import '../../css/PortfolioCard.css';
import RequestAuction from './RequestAuctionPopup';




const PortfolioCard = ({ art, onClick, onAuctionRequest ,onDelete }) => 
  {
    const [requestAuctionpopup , setRequestAuctionpopup] = useState(false);
    console.log(art);

  return (
    <>
    <div className="portfolio-card" onClick={() => onClick(art)}>
      <button
        className="delete-button-portifilio"
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete(art); 
        }}
      >
        ✖
      </button>
      <img src={art.photo} alt={art.artname} className="portfolio-card-image" />
      <h3 className="portfolio-card-title">{art.artname}</h3>
      <button
        className="request-auction-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card click event
          setRequestAuctionpopup(true);
        }}
      >
        Request Auction
      </button>
    </div>
    {requestAuctionpopup && <RequestAuction art={art}  sendRequest = {onAuctionRequest} onClose={()=>{requestAuctionpopup(false)}}/>}
      </>
  );
};

export default PortfolioCard;
