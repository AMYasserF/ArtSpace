import React, { useState } from "react";
import PopupForm from "./PopupFormA";
import "../../css/auctions.css";

const Auctions = () => {
  // Example data for requested auctions
  const auctionRequests = [
    {
      id: 1,
      artPhoto: "https://via.placeholder.com/150",
      artistName: "Vincent van Gogh",
      artName: "Starry Night",
    },
    {
      id: 2,
      artPhoto: "https://via.placeholder.com/150",
      artistName: "Leonardo da Vinci",
      artName: "Mona Lisa",
    },
    {
      id: 3,
      artPhoto: "https://via.placeholder.com/150",
      artistName: "Salvador Dalí",
      artName: "The Persistence of Memory",
    },
  ];

  const [selectedAuction, setSelectedAuction] = useState(null); // Tracks the selected auction
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state

  // Opens the popup form for the selected auction
  const handleAcceptClick = (auction) => {
    setSelectedAuction(auction);
    setIsPopupOpen(true);
  };

  // Closes the popup form
  const handleClosePopup = () => {
    setSelectedAuction(null);
    setIsPopupOpen(false);
  };

  // Handles rejection (logs or calls API)
  const handleRejectClick = (auction) => {
    console.log(`Auction request for ${auction.artName} rejected.`);
  };

  return (
    <div className="auctions">
      <h1>Approve or Reject Auctions</h1>
      <div className="auction-cards">
        {auctionRequests.map((auction) => (
          <div key={auction.id} className="auction-card">
            <img src={auction.artPhoto} alt={auction.artName} />
            <h2>{auction.artName}</h2>
            <p>Artist: {auction.artistName}</p>
            <div className="card-buttons">
              <button
                className="accept-button"
                onClick={() => handleAcceptClick(auction)}
              >
                Accept
              </button>
              <button
                className="reject-button"
                onClick={() => handleRejectClick(auction)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <PopupForm
          item={selectedAuction}
          title="Enter Auction Details"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Auctions;
