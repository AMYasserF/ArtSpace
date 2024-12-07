import React, { useState } from "react";
import "../../css/popupForm.css";

const PopupForm = ({ user, onClose }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Blocking report for ${user.name} (${user.role}): ${reason}`);
    onClose(); // Close the popup after submission
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Block User: {user.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reason">Reason for Blocking</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for blocking this user..."
              required
            ></textarea>
          </div>
          <div className="popup-actions">
            <button type="submit" className="submit-button">
              Submit Report
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
