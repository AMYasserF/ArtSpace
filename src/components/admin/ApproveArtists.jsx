import React, { useState } from "react";
import ArtistApplicationPopup from "./ArtistApplicationPopup";
import "../../css/approveArtists.css";

const ApproveArtists = () => {
  // Example data for artist requests
  const [artistRequests, setArtistRequests] = useState([
    { id: 1, name: "John Doe", portfolioLink: "https://johndoe.art", applicationDate: "2024-05-01" },
    { id: 2, name: "Jane Smith", portfolioLink: "https://janesmith.art", applicationDate: "2024-05-03" },
    { id: 3, name: "Emily Johnson", portfolioLink: "https://emilyjohnson.art", applicationDate: "2024-05-04" },
  ]);

  const [selectedArtist, setSelectedArtist] = useState(null); // Tracks the artist whose application is being viewed
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state

  // Opens the popup form to view the artist's application
  const handleViewApplication = (artist) => {
    setSelectedArtist(artist);
    setIsPopupOpen(true);
  };

  // Close the popup form
  const handleClosePopup = () => {
    setSelectedArtist(null);
    setIsPopupOpen(false);
  };

  // Handle approving or rejecting artist
  const handleApproveReject = (artist, decision) => {
    console.log(`${artist.name} has been ${decision}`);
    setIsPopupOpen(false);
    // Implement the actual approve/reject functionality (e.g., API call)
  };

  return (
    <div className="approve-artists">
      <h1>Approve Artists</h1>
      <div className="artist-list">
        {artistRequests.map((artist) => (
          <div key={artist.id} className="artist-row">
            <span>{artist.name}</span>
            <span>{artist.applicationDate}</span>
            <button onClick={() => handleViewApplication(artist)} className="view-button">
              View Application
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up for viewing artist's application */}
      {isPopupOpen && (
        <ArtistApplicationPopup 
          artist={selectedArtist} 
          onApprove={(artist) => handleApproveReject(artist, "approved")} 
          onReject={(artist) => handleApproveReject(artist, "rejected")} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
};

export default ApproveArtists;
