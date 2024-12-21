import React, { useState, useEffect } from "react";
import "../css/exhibitions.css";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Exhibitions = () => {
    const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [isArtworkPopupOpen, setIsArtworkPopupOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/exhibition").then((response) => {
      setExhibitions(response.data);
      console.log(response.data);
    }).catch((err) => {
      console.error("Error fetching exhibitions", err);
    });
  }, []);

  const handleSeeArtworks = (exhibition) => {
    console.log("See Artworks for", exhibition.theme);
    setSelectedExhibition(exhibition);
    setIsArtworkPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsArtworkPopupOpen(false);
    setSelectedExhibition(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Exhibitions</h1>
      <div className="row">
        {exhibitions.map((exhibition) => (
          <div key={exhibition.theme} className="exhibition-card">
            <h2>{exhibition.title}</h2>
            <p><strong>Theme:</strong> {exhibition.theme}</p>
            <p><strong>Start Date:</strong> {exhibition.startdate}</p>
            <p><strong>End Date:</strong> {exhibition.enddate}</p>
            
            <div className="exhibition-artworks">
              <h3>Included Artworks:</h3>
              <div className="exhibition-artworks-container">
              {exhibition.artworks.map((artwork) => (
                <div key={artwork.artid} className="artwork">
                  <img src={artwork.photo} alt={artwork.artname} />
                  <p>{artwork.artname} by {artwork.artistName}</p>
                </div>
              ))}
            </div>
            </div>

            <button onClick={() => handleSeeArtworks(exhibition)} className="manage-artworks-button">See Artworks</button>
          </div>
        ))}
      </div>

      {selectedExhibition && (
        <Modal show={isArtworkPopupOpen} onHide={handleClosePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Artworks in {selectedExhibition.theme}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {selectedExhibition.artworks.map((artwork) => (
                <li key={artwork.artid}>
                  <img src={artwork.photo} alt={artwork.artname} />
                  <p>{artwork.artname} by {artwork.artistName}</p>
                  <Button variant="primary" onClick={()=>{    navigate(`/portfolio/preview/${artwork.artistName}`);}}>See Artist</Button>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePopup}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Exhibitions;