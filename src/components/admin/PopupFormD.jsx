import React, { useState } from "react";
import "../../css/popupForm.css"; // Ensure this CSS file contains the popup styles

const PopupForm = ({ item, title, onClose }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${title}: ${item.name || item.artist} - Reason: ${reason}`);
    onClose(); // Close the popup after submission
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>Item: {item.name || item.artist}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reason">Reason for Deletion</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason..."
              required
            ></textarea>
          </div>
          <div className="popup-actions">
            <button type="submit" className="submit-button">
              Submit
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
