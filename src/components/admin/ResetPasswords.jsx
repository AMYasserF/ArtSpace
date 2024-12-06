import React, { useState } from "react";
import ResetPasswordPopup from "./ResetPasswordPopup";
import "../../css/resetPasswords.css";

const ResetPasswords = () => {
  // Example data for password reset requests
  const [resetRequests, setResetRequests] = useState([
    { id: 1, name: "John Doe", requestDate: "2024-05-01", reason: "Forgot password" },
    { id: 2, name: "Jane Smith", requestDate: "2024-05-02", reason: "Account hacked" },
    { id: 3, name: "Emily Johnson", requestDate: "2024-05-03", reason: "Lost access" },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null); // Tracks the selected reset request
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state

  // Opens the pop-up form for resetting the password
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsPopupOpen(true);
  };

  // Close the pop-up form
  const handleClosePopup = () => {
    setSelectedRequest(null);
    setIsPopupOpen(false);
  };

  // Handle approving or rejecting password reset request
  const handleApproveReject = (request, decision) => {
    console.log(`${request.name}'s password reset request has been ${decision}`);
    setIsPopupOpen(false);
    // Implement the actual approve/reject functionality (e.g., API call)
  };

  return (
    <div className="reset-passwords">
      <h1>Reset Password Requests</h1>
      <div className="reset-requests-list">
        {resetRequests.map((request) => (
          <div key={request.id} className="request-row">
            <span>{request.name}</span>
            <span>{request.requestDate}</span>
            <span>{request.reason}</span>
            <button onClick={() => handleViewRequest(request)} className="view-button">
              View Request
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up for resetting password */}
      {isPopupOpen && (
        <ResetPasswordPopup 
          request={selectedRequest} 
          onApprove={(request) => handleApproveReject(request, "approved")} 
          onReject={(request) => handleApproveReject(request, "rejected")} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
};

export default ResetPasswords;
