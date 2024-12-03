import React from 'react';
import { useState } from 'react';
import '../../css/ArtPopUp.css';
import CommentSection from './CommentSection';
import ReviewPopUp from './ReviewPopUp';
import EditArtPopup from '../Portfolio/EditArtPopup';


const ArtPopUp = ({ post, onClose , theArtist , onSave }) => {
    const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);
    const [isEditPopupOpen , setEditPopupOpen] = useState(false);

    const handleAddReview = () => {
      setReviewPopupOpen(true);
    };

    const handleEditArt =() => {
        setEditPopupOpen(true);
    }
  
    const handleReviewSubmit = (newReview) => {
      console.log('New Review:', newReview);
      // Update the comments array or pass this data to a backend service
      post.comments.push(newReview);
    };

    
  return (
    <>
    <div className="popup">
        <div className="popup-overlay" onClick={onClose}></div>
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
          <div className="popup-left">
            <img src={post.imageUrl} alt={post.title} className="popup-image" />
          </div>
          <div className="popup-right">

            {theArtist === false && <div className="popup-creator-info">
              <img
                src={post.creator.profilePic}
                alt={`${post.creator.username}'s profile`}
                className="popup-profile-pic"
              />
              <p className="popup-username">{post.creator.username}</p>
            </div> 
            }
            <h2 className="art-title">{post.title}</h2>
            <p className="art-description"><strong>Description:</strong> {post.description}</p>
            <p className="base-price"><strong>Base Price:</strong> {post.basePrice}</p>
            <div className="popup-buttons">
             {theArtist ===false? 
             <>
             <button className="buy-now-button">Buy Now</button>
              <button className="add-review-button" onClick={handleAddReview}>
                Add Review
              </button>
              </>: 
              <button className="Edit-art-info" onClick={handleEditArt}>Edit</button>}
            </div>
          <div className="comment-section">
            <h3>Comments</h3>
            <CommentSection comments={post.comments} />
          </div>
        </div>
      </div>
    </div>
    {isReviewPopupOpen && (
        <ReviewPopUp
          onClose={() => setReviewPopupOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}

    {isEditPopupOpen && (
        <EditArtPopup
        art = {post}
          onClose={() => setEditPopupOpen(false)}
          onSave={onSave}
          />
    )}

    </>
  );
};

export default ArtPopUp;
