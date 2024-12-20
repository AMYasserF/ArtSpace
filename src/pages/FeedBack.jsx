import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Stars from 'react-rating-stars-component';
import 'react-toastify/dist/ReactToastify.css';
import '../css/FeedBack.css'; // Import the CSS file

const FeedBack = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [existingFeedback, setExistingFeedback] = useState(false);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/UserFeedback");
        setFeedback(response.data);
        console.log(response.data);
        if(response.data)
        setExistingFeedback(true);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };

    fetchFeedback();
  }, []); // Empty dependency array ensures this runs only once on mount
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
    description: feedback,
      rate: rating,
    };

    axios.post('http://localhost:3000/user/Feedback', feedbackData)
      .then(response => {
        toast.success('Feedback submitted successfully');
        setExistingFeedback(true);
      })
      .catch(error => {
        toast.error('Error submitting feedback');
        console.error('Error submitting feedback:', error);
      });
  };
  const handleUpdate = () => {
    setFeedback(feedback.description);
    setRating(feedback.rating);
    axios.put('http://localhost:3000/user/Feedback', {feedbackId:feedback.feedid}).
    then(response => {
        toast.success('Feedback updated successfully');
        setExistingFeedback(true);
        })
        .catch(error => {
          toast.error('Error updating feedback');
          console.error('Error updating feedback:', error);
        });
  };
    const handleDelete = (feedback) => {
    axios.post('http://localhost:3000/user/deleteFeedback', {feedbackId:feedback.feedid}).
    then(response => {
        toast.success('Feedback deleted successfully');
        setFeedback('');
        setRating(0);
        setExistingFeedback(false);
        })
        .catch(error => {
          toast.error('Error deleting feedback');
          console.error('Error deleting feedback:', error);
        });
    };
    console.log(existingFeedback);
  return (
    existingFeedback===false ? 
    <div className="feedback-container">
      <ToastContainer />
      <h1>Submit Your Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="rating">
        <Stars
          count={5}
          value={rating}
          size={30}
          isHalf={true}
          onChange={(newRating) => setRating(newRating)}
          activeColor="#ffd700"
          required
        />
        </div>
        <textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          required
        />
        <button type="submit">Submit Feedback</button>
        <h2>Your feedback helps us improve our quality</h2>
      </form>
    </div>:      
    <div className="existing-feedback">
    <h2>You already have an existing Feedback</h2>
      <div className="feedback-item">
        <textarea 
          value={feedback.description} 
          onChange={(e) => handleFeedbackChange(e, 'description')} 
          className="form-control mb-2"
        />
        <Stars
          count={5}
          value={feedback.rating}
          size={30}
          isHalf={true}
          edit={true}
          onChange={(newRating) => handleFeedbackChange({ target: { value: newRating } }, 'rating')}
          activeColor="#ffd700"
        />
        <div className="feedback-actions mt-2">
          <button className="btn btn-primary me-2" onClick={() => handleUpdate(feedback)}>Update</button>
          <button className="btn btn-danger" onClick={() => handleDelete(feedback)}>Delete</button>
        </div>
      </div>
  </div>
  );
};

export default FeedBack;