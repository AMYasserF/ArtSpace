import React, { useState } from "react";
import "../../css/popupForm.css";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const PopupForm = ({ item, title, onClose,id }) => {
  const [auctionDetails, setAuctionDetails] = useState({
    auctionTitle: "",
    initialBidPrice: item.baseprice,
    startDate: item.startDate,
    endDate: item.endDate,
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
    console.log(item.auctionid);
    axios.put("http://localhost:3000/admin/auction/approve", {
      auctionId: item.auctionid,
      startingPrice: auctionDetails.initialBidPrice,
      startDate: auctionDetails.startDate,
      endDate: auctionDetails.endDate,
    }).then((response) => {
      console.log(response.data);
      toast.success("Auction created successfully");
    }).catch((err) => {
      console.error("Error creating auction", err);
      toast.error("Failed to create auction");
    });
    setTimeout(() => {
     // onClose();
    }, 1000);
  };

  return (
    <div className="popup-overlay">
      <ToastContainer />
      <div className="popup">
        <h2>{title}</h2>
        <p>Art: {item.artName}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="initialBidPrice">Initial Bid Price</label>
            <input
              type="integer"
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
