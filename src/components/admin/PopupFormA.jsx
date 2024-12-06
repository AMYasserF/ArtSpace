import React, { useState } from "react";
import "../../css/popupForm.css";

const PopupForm = ({ item, title, onClose }) => {
  const [auctionDetails, setAuctionDetails] = useState({
    auctionTitle: "",
    initialBidPrice: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Auction created for ${item.artName}:`,
      auctionDetails
    );
    onClose(); // Close the popup after submission
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>Art: {item.artName}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="auctionTitle">Auction Title</label>
            <input
              type="text"
              id="auctionTitle"
              name="auctionTitle"
              value={auctionDetails.auctionTitle}
              onChange={handleChange}
              placeholder="Enter auction title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="initialBidPrice">Initial Bid Price</label>
            <input
              type="number"
              id="initialBidPrice"
              name="initialBidPrice"
              value={auctionDetails.initialBidPrice}
              onChange={handleChange}
              placeholder="Enter initial bid price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={auctionDetails.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={auctionDetails.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="popup-actions">
            <button type="submit" className="submit-button">
              Create Auction
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
