import React, { useEffect, useState } from "react";
import PopupForm from "./PopupFormA";
import "../../css/auctions.css";
import axios from "axios";

const Auctions = () => {


  const [selectedAuction, setSelectedAuction] = useState(null); // Tracks the selected auction
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state
  const [auctionRequests, setAuctionRequests] = useState([]); // Tracks the auction requests
  useEffect(() => {
    axios.get("http://localhost:3000/admin/req/auctions").then((response) => {
      setAuctionRequests(response.data);
      console.log(response.data);
    }).catch((err) => {
      console.error("Error fetching auction requests", err);
    });
  }, []);

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
    console.log(`Auction request for ${auction.artname} rejected.`);
  };

  return (
    <div className="auctions">
      <h1>Approve or Reject Auctions</h1>
      <div className="auction-cards">
        {auctionRequests.map((auction) => (
          <div key={auction.id} className="auction-card">
            <img src={auction.photo} alt={auction.artname} />
            <h2>{auction.artname}</h2>
            <p>Artist: {auction.name}</p>
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
          id={selectedAuction.id}
          item={selectedAuction}
          title="Enter Auction Details"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Auctions;
