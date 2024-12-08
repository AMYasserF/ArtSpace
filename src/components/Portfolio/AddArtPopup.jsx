import React, { useState } from "react";
import "../../css/AddArtPopup.css";


const AddArtPopup = ({ onClose, onAdd }) => {
  const [artDetails, setArtDetails] = useState({
    title: "",
    description: "",
    basePrice: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setArtDetails((prevDetails) => ({ ...prevDetails, image: file }));
  };

  const handleSubmit = () => {
    if (!artDetails.title || !artDetails.description || artDetails.image === null) {
      return;

      // add toast here
    }
    console.log(artDetails)
    onAdd(artDetails); 
    onClose(); 
  };

  
  return (
    <div className="add-art-popup">
      <div className="popup-content-portifilio">
        <h2>Add New Art</h2>
          <input
          className="art-title-portifilio"
           placeholder="Art Title"
            type="text"
            name="title"
            value={artDetails.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            className="art-description-portifilio"
            placeholder="Art description"
            name="description"
            value={artDetails.description}
            onChange={handleInputChange}
            required
          />
          <input
            className="base-price-portifilio"
            placeholder="base price (optional)"
            type="number"
            name="basePrice"
            value={artDetails.basePrice}
            onChange={handleInputChange}
            min="0"
          />  
        <label>
          Upload Image:
          </label>
          <input className="upload-art" type="file" accept="image/*" onChange={handleImageUpload} />
       
        <div className="popup-buttons-portifilio">
          <button onClick={handleSubmit}>Add Art</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddArtPopup;
