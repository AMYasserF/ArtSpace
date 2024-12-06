import React, { useState } from "react";
import PopupForm from "./PopupFormD";
import "../../css/manageArtworks.css";

const ManageArtworks = () => {
  // Example arbitrary data for artworks
  const artworks = [
    { id: 1, name: "Starry Night", artist: "Vincent van Gogh" },
    { id: 2, name: "Mona Lisa", artist: "Leonardo da Vinci" },
    { id: 3, name: "The Persistence of Memory", artist: "Salvador Dalí" },
    { id: 4, name: "The Scream", artist: "Edvard Munch" },
    { id: 5, name: "Girl with a Pearl Earring", artist: "Johannes Vermeer" },
  ];

  const [selectedArtwork, setSelectedArtwork] = useState(null); // Tracks the artwork to be deleted
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks the popup state

  // Opens the popup form for the selected artwork
  const handleDeleteClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsPopupOpen(true);
  };

  // Closes the popup form
  const handleClosePopup = () => {
    setSelectedArtwork(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="manage-artworks">
      <h1>Manage Artworks</h1>
      <div className="artwork-list">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-row">
            <span>{artwork.name}</span>
            <span>{artwork.artist}</span>
            <button onClick={() => handleDeleteClick(artwork)}>Delete</button>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <PopupForm
          item={selectedArtwork}
          title="Delete Artwork"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ManageArtworks;
