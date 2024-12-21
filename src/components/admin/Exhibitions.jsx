import React, { useState,useEffect } from "react";
import PopupForm from "./PopupFormE";
import ManageArtworksPopup from "./ManageArtworksPopup";
import "../../css/exhibitions.css";
import axios from "axios";

const Exhibitions = () => {
 
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [isArtworkPopupOpen, setIsArtworkPopupOpen] = useState(false); 
  useEffect(() => {
    axios.get("http://localhost:3000/admin/exhibition").then((response) => {
      setExhibitions(response.data);
      console.log(response.data);
    }).catch((err) => {
      console.error("Error fetching auction requests", err);
    });
  }, []);
  // Opens the popup form for adding a new exhibition
  const handleAddExhibition = () => {
    setSelectedExhibition(null); // Reset selected exhibition for adding a new one
    setIsPopupOpen(true);
  };

  // Opens the popup for modifying an exhibition
  const handleModifyExhibition = (exhibition) => {
    setSelectedExhibition(exhibition);
    setIsPopupOpen(true);
  };

  // Opens the popup for adding/removing artworks
  const handleManageArtworks = (exhibition) => {
    setSelectedExhibition(exhibition);
    setIsArtworkPopupOpen(true);
  };

  // Close the popups
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsArtworkPopupOpen(false);
  };

  return (
    <div className="exhibitions">
      <h1>Exhibitions Management</h1>
      <button onClick={handleAddExhibition} className="add-exhibition-button">Add New Exhibition</button>
      
      <div className="exhibition-list">
        {exhibitions.map((exhibition) => (
          <div key={exhibition.theme} className="exhibition-card">
            <h2>{exhibition.title}</h2>
            <p><strong>Theme:</strong> {exhibition.theme}</p>
            <p><strong>Start Date:</strong> {exhibition.startdate}</p>
            <p><strong>End Date:</strong> {exhibition.enddate}</p>
            
            <div className="exhibition-artworks">
              <h3>Included Artworks:</h3>
              {exhibition.artworks.map((artwork) => (
                <div key={artwork.artid} className="artwork">
                  <img src={artwork.photo} alt={artwork.artname} />
                  <p>{artwork.artname} by {artwork.artistName}</p>
                </div>
              ))}
            </div>

            <button onClick={() => handleModifyExhibition(exhibition)} className="modify-button">Modify Exhibition</button>
            <button onClick={() => handleManageArtworks(exhibition)} className="manage-artworks-button">Manage Artworks</button>
          </div>
        ))}
      </div>

      {/* Popups */}
      {isPopupOpen && <PopupForm exhibition={selectedExhibition} onClose={handleClosePopup} />}
      {isArtworkPopupOpen && <ManageArtworksPopup exhibition={selectedExhibition} onClose={handleClosePopup} />}
    </div>
  );
};

export default Exhibitions;
