import React, { useState,useEffect } from "react";
import PopupForm from "./PopupFormD";
import "../../css/manageArtworks.css";
import axios from "axios";
const ManageBannedArtworks = () => {
  // Example arbitrary data for artworks
  const [artworks,setArtWorks] = useState([]);
  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/ban/art");
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
  const [reason, setReason] = useState(''); // Tracks the reason for blocking the user
  // Opens the popup form for the selected artwork
  const handleRetrieveClick = (artwork) => {
    try{
      console.log(artwork.id);
      const resp=axios.post(`http://localhost:3000/admin/unban/art`,{
        artID:artwork.artid,
      });
      console.log("Artwork has been deleted successfully");
    }
    catch(err){
      console.log("Error deleting artwork");
      console.log(err);
    }
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
            <button onClick={() => handleRetrieveClick(artwork)}>Retrieve</button>
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

export default ManageBannedArtworks;
