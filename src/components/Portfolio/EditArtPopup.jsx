import React, { useState } from 'react';
import '../../css/EditArtPopup.css';

const EditArtPopup = ({ art, onClose, onSave }) => {
  const [title, setTitle] = useState(art.artname);
  const [description, setDescription] = useState(art.description);
  const [basePrice, setBasePrice] = useState(art.basePrice);

  const handleSave = () => {
    const updatedArt = { ...art, title, description, basePrice };
    onSave(updatedArt);
    onClose();
  };

  return (
    <div className="edit-art-popup">
      <div className="edit-art-popup-overlay" onClick={onClose}></div>
      <div className="edit-art-popup-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h3>Edit Artwork</h3>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="basePrice">Base Price</label>
          <input
            type="text"
            id="basePrice"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditArtPopup;
