import React, { useState } from "react";
import "../../css/popupForm.css";

const ManageArtworksPopup = ({ exhibition, onClose }) => {
  const [selectedArtworks, setSelectedArtworks] = useState(exhibition.artworks || []);
  const [availableArtworks] = useState([
    { id: 1, name: "Starry Night", artist: "Vincent van Gogh", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Mona Lisa", artist: "Leonardo da Vinci", image: "https://via.placeholder.com/150" },
    { id: 3, name: "The Persistence of Memory", artist: "Salvador Dalí", image: "https://via.placeholder.com/150" },
    { id: 4, name: "The Last Supper", artist: "Leonardo da Vinci", image: "https://via.placeholder.com/150" },
  ]);

  const handleSelectArtwork = (artwork) => {
    if (!selectedArtworks.find((art) => art.id === artwork.id)) {
      setSelectedArtworks([...selectedArtworks, artwork]);
    }
  };

  const handleRemoveArtwork = (artworkId) => {
    setSelectedArtworks(selectedArtworks.filter((art) => art.id !== artworkId));
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Manage Artworks for {exhibition.theme}</h2>
        <h3>Selected Artworks</h3>
        <div className="artwork-list">
          {selectedArtworks.map((artwork) => (
            <div key={artwork.id} className="artwork">
              <img src={artwork.image} alt={artwork.name} />
              <p>{artwork.name} by {artwork.artist}</p>
              <span className="remove-artwork" onClick={() => handleRemoveArtwork(artwork.id)}>❌</span>
            </div>
          ))}
        </div>
        <h3>Available Artworks</h3>
        <div className="artwork-list">
          {availableArtworks.map((artwork) => (
            <div key={artwork.id} className="artwork">
              <img src={artwork.image} alt={artwork.name} />
              <p>{artwork.name} by {artwork.artist}</p>
              <button onClick={() => handleSelectArtwork(artwork)}>Add</button>
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={onClose}>Save Changes</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ManageArtworksPopup;
