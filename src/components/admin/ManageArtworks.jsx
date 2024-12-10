import React, { useState,useEffect } from "react";
import PopupForm from "./PopupFormD";
import "../../css/manageArtworks.css";
import axios from "axios";
const ManageArtworks = () => {
  // Example arbitrary data for artworks
  const [artworks,setArtWorks] = useState([]);
  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/arts");
        setArtWorks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };

    fetchArts();
  }, []); // Empty dependency array ensures this runs only once on mount
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
            <span>{artwork.artname}</span>
            <span>{artwork.artistName}</span>
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
