import React, { useState } from "react";
import "../../css/popupForm.css";

const PopupForm = ({ exhibition, onClose }) => {
  const [formData, setFormData] = useState({
    title: exhibition ? exhibition.title : "",
    theme: exhibition ? exhibition.theme : "",
    startDate: exhibition ? exhibition.startDate : "",
    endDate: exhibition ? exhibition.endDate : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exhibition data submitted:", formData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{exhibition ? "Modify Exhibition" : "Add New Exhibition"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Exhibition Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="theme">Theme (Unique, One Word)</label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
