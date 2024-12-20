import React, { useEffect, useState } from "react";
import "../../css/popupForm.css";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ManageArtworksPopup = ({ exhibition, onClose }) => {
  const [selectedArtworks, setSelectedArtworks] = useState(exhibition.artworks || []);
  const [availableArtworks,setAvailableArtworks] = useState([]);
  console.log(selectedArtworks);
  useEffect(() => {
    axios.get("http://localhost:3000/arts").then((response) => {
      console.log(response.data);
      setAvailableArtworks(response.data);
    }).catch((err) => {
      console.error("Error fetching artworks", err);
    });
  }, []);
  const handleSelectArtwork = (artwork) => {
    if (!selectedArtworks.find((art) => art.artid === artwork.artid)) {
      setSelectedArtworks([...selectedArtworks, artwork]);
    }
    axios.post("http://localhost:3000/admin/exhibition/arts",{
      artId: artwork.artid,
      exhibitionId: exhibition.exhibitionid
    }).then((response) => {
      console.log("Artwork added to exhibition", response.data);
      toast.success("Artwork added to exhibition successfully");
    }).catch((err) => {
      setSelectedArtworks(selectedArtworks.filter((art) => art.artid !== artwork.artid));
      toast.error("Error adding artwork to exhibition");
      console.error("Error adding artwork to exhibition", err);
    });
  };

  const handleRemoveArtwork = (artworkId) => {
    setSelectedArtworks(selectedArtworks.filter((art) => art.artid !== artworkId));
    axios.post("http://localhost:3000/admin/exhibition/Remarts",{
      artId: artworkId,
      exhibitionId: exhibition.exhibitionid
    }).then((response) => {
      console.log("Artwork added to exhibition", response.data);
      toast.success("Artwork removed from exhibition successfully");
    }).catch((err) => {
      setSelectedArtworks(selectedArtworks.filter((art) => art.artid !== artworkId));
      toast.error("Error removing artwork from exhibition");
      console.error("Error removing artwork from exhibition", err);
    });
  };

  return (
    <div className="popup-overlay">
      <ToastContainer/>
      <div className="popup">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Manage Artworks for {exhibition.theme}</h2>
        <h3>Selected Artworks</h3>
        <div className="modal-body">
        <div className="artwork-list overflow-auto" style={{ maxHeight: '150px' }}>
            {selectedArtworks.map((artwork) => (
              <div key={artwork.artid} className="artwork mb-3">
              <img src={artwork.photo} alt={artwork.artname} className="img-fluid" />
              <p>{artwork.artname} by {artwork.artistName}</p>
              <span className="remove-artwork" onClick={() => handleRemoveArtwork(artwork.artid)}>❌</span>
            </div>
          ))}
        </div>
        </div>
        <h3>Available Artworks</h3>
        <div className="modal-body">
            <div className="artwork-list overflow-auto" style={{ maxHeight: '130px' }}>
              {availableArtworks.map((artwork) => (
                <div key={artwork.artid} className="artwork mb-3">
                  <img src={artwork.photo} alt={artwork.artname} className="img-fluid" />
                  <p>{artwork.artname} by {artwork.artistName}</p>
                  <button className="add-artwork" onClick={() => handleSelectArtwork(artwork)}>Add</button>
                </div>
              ))}
            </div>
          </div>
        <button className="submit-button" onClick={onClose}>Save Changes</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ManageArtworksPopup;
