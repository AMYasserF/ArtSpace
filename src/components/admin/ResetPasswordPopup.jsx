import React, { useState } from "react";
import "../../css/popupForm.css";

const ResetPasswordPopup = ({ request, onApprove, onReject, onClose }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Password for ${request.name} has been reset to: ${newPassword}`);
    onApprove(request); // Approve after setting the new password
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Reset Password for {request.name}</h2>
        <p><strong>Request Date:</strong> {request.requestDate}</p>
        <p><strong>Reason:</strong> {request.reason}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="popup-actions">
            <button type="submit" className="submit-button">Reset Password</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="button" className="reject-button" onClick={() => onReject(request)}>Reject</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
