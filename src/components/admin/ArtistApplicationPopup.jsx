import React from "react";
import "../../css/popupForm.css";

const ArtistApplicationPopup = ({ artist, onApprove, onReject, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Artist Application</h2>
        <div className="artist-details">
          <p><strong>Name:</strong> {artist.name}</p>
          <p><strong>Portfolio Link:</strong> <a href={artist.portfolioLink} target="_blank" rel="noopener noreferrer">{artist.portfolioLink}</a></p>
          <p><strong>Application Date:</strong> {artist.applicationDate}</p>
        </div>
        <div className="popup-actions">
          <button className="approve-button" onClick={() => onApprove(artist)}>
            Approve
          </button>
          <button className="reject-button" onClick={() => onReject(artist)}>
            Reject
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistApplicationPopup;
