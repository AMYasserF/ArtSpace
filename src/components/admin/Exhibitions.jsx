import React, { useState } from "react";
import PopupForm from "./PopupFormE";
import ManageArtworksPopup from "./ManageArtworksPopup";
import "../../css/exhibitions.css";

const Exhibitions = () => {
  // Example ongoing exhibitions data (using theme as primary key)
  const [exhibitions, setExhibitions] = useState([
    {
      theme: "Impressionism",
      title: "The Beauty of Light",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      artworks: [
        { id: 1, name: "Starry Night", artist: "Vincent van Gogh", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Mona Lisa", artist: "Leonardo da Vinci", image: "https://via.placeholder.com/150" },
      ],
    },
    {
      theme: "Renaissance",
      title: "Masters of the Renaissance",
      startDate: "2024-07-01",
      endDate: "2024-07-15",
      artworks: [
        { id: 3, name: "The Last Supper", artist: "Leonardo da Vinci", image: "https://via.placeholder.com/150" },
        { id: 4, name: "David", artist: "Michelangelo", image: "https://via.placeholder.com/150" },
      ],
    },
  ]);

  const [selectedExhibition, setSelectedExhibition] = useState(null); // Tracks the exhibition being modified
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Tracks if the create/edit exhibition popup is open
  const [isArtworkPopupOpen, setIsArtworkPopupOpen] = useState(false); // Tracks if the artwork management popup is open

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
            <p><strong>Start Date:</strong> {exhibition.startDate}</p>
            <p><strong>End Date:</strong> {exhibition.endDate}</p>
            
            <div className="exhibition-artworks">
              <h3>Included Artworks:</h3>
              {exhibition.artworks.map((artwork) => (
                <div key={artwork.id} className="artwork">
                  <img src={artwork.image} alt={artwork.name} />
                  <p>{artwork.name} by {artwork.artist}</p>
                  <span className="remove-artwork" onClick={() => handleManageArtworks(exhibition)}>❌</span>
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
