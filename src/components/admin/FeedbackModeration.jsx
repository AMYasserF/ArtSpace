
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FeedbackModeration = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/Feedback");
        console.log(response.data);
        setFeedbacks(response.data);
      } catch (error) {
        console.log("Error fetching feedbacks", error.response?.data || error.message);
      }
    };

    fetchFeedbacks();
  },[]);
  const handleDeleteFeedBack = () => {
    axios.delete(`http://localhost:3000/admin/feedback`).then((response) => {
      console.log("Feedback deleted successfully", response.data);
      toast.success("Feedback deleted successfully");
    }).catch((err) => {
      console.error("Error deleting feedback", err);
      toast.error("Could not delete feedback");
    });
  };
  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="mb-4">Feedback List</h1>
      {feedbacks.length > 0 ? (
        <ul className="list-group">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Description:</strong> {feedback.description}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFeedBack(feedback.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackModeration;