import React, { useState } from "react";
import "../../css/popupForm.css";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
    console.log("Exhibition details");
    axios.post("http://localhost:3000/admin/exhibition",formData).then((response) => {
      console.log("Exhibition added successfully", response.data);
      // wait 3 seconds before closing the popup
      setTimeout(() => {
      toast.success("Exhibition added successfully");
      }, 3000);
    }).catch((err) => {
      console.error("Error adding exhibition", err);
      setTimeout(() => {
      toast.error("Could not add exhibition");
      },3000);
    });  
    onClose();
  };

  return (
    <div className="popup-overlay">
      <ToastContainer/>
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
