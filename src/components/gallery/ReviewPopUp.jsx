import React, { useState } from 'react';
import Stars from 'react-rating-stars-component';
import '../../css/ReviewPopUp.css';

const ReviewPopUp = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({ rating, comment }); // Pass the review data to the parent
    onClose(); // Close the popup after submission
  };

  return (
    <div className="review-popup">
      <div className="review-popup-overlay" onClick={onClose}></div>
      <div className="review-popup-content">
        <h3>Add a Review</h3>
        <Stars
          count={5}
          value={rating}
          size={30}
          isHalf={true}
          onChange={(newRating) => setRating(newRating)}
          activeColor="#ffd700"
        />
        <textarea
          className="review-input"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="submit-review-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewPopUp;
