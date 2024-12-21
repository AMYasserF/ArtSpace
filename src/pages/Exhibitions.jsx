import React, { useState, useEffect } from "react";
import "../css/exhibitions.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]); // Stores exhibition data
  const [selectedExhibition, setSelectedExhibition] = useState(null); // Tracks selected exhibition

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/exhibition")
      .then((response) => {
        setExhibitions(response.data);
      })
      .catch((err) => {
        console.error("Error fetching exhibitions", err);
      });
  }, []);

  const handleSeeArtworks = (exhibition) => {
    // Sets the selected exhibition for rendering in the Gallery component
    setSelectedExhibition(exhibition);
  };

  return (
    <div>
      {selectedExhibition ? (
        <Gallery
          Logged={true}
          formexhibition={true}
          artworks={selectedExhibition.artworks}
        />
      ) : (
        <div className="container mt-5">
          <h1 className="mb-4">Exhibitions</h1>
          <div className="row">
            {exhibitions.map((exhibition) => (
              <div key={exhibition.theme} className="exhibition-card">
                <h2>{exhibition.title}</h2>
                <p>
                  <strong>Theme:</strong> {exhibition.theme}
                </p>
                <p>
                  <strong>Start Date:</strong> {exhibition.startdate}
                </p>
                <p>
                  <strong>End Date:</strong> {exhibition.enddate}
                </p>

                <div className="exhibition-artworks">
                  <h3>Included Artworks:</h3>
                  {exhibition.artworks.map((artwork) => (
                    <div key={artwork.artid} className="artwork">
                      <img src={artwork.photo} alt={artwork.artname} />
                      <p>
                        {artwork.artname} by {artwork.artistName}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSeeArtworks(exhibition)}
                  className="manage-artworks-button"
                >
                  View Artworks
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exhibitions;
