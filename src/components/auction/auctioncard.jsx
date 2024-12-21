import React, { useState, useEffect } from "react";
import "../../css/auctionCard.css";

const AuctionCard = ({ auction,onClick }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endDate = new Date(auction.endtime);
      const timeDiff = Math.max(endDate - now, 0);

      const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0");

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [auction.endtime]);

  return (
    <div className="auction-card" onClick={onClick}>
      <img
        src={auction.photo}
        className="auction-card-img-top"
        alt={auction.artname}
      />
      <div className="auction-card-body">
        <h5 className="auction-card-title">{auction.artname}</h5>
        <p className="auction-card-text">{auction.description}</p>
        <div className="d-flex align-items-center mb-3">
          <img
            src={auction.profilepic}
            alt={auction.name}
            className="auction-artist-profile-img"
          />
          <span>{auction.name}</span>
        </div>
        <p className="auction-card-text">
          <strong>Current Highest Bid:</strong> ${auction.highestbid}
        </p>
        <p className="auction-card-text">
          <strong>Current Highest Bidder:</strong>{" "}
          {auction.winner || "No bids yet"}
        </p>
        <p className="auction-card-text">
          <strong>Starting Bid:</strong> ${auction.startingbid}
        </p>
        <p className="auction-card-text">
          <strong>Time Left:</strong> {timeLeft}
        </p>
      </div>
    </div>
  );
};

export default AuctionCard;
