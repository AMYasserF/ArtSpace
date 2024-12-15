import React from 'react';
import { useState } from 'react';
import '../../css/ArtPopUp.css';
import CommentSection from './CommentSection';
import ReviewPopUp from './ReviewPopUp';
import EditArtPopup from '../Portfolio/EditArtPopup';


const ArtPopUp = ({ post, onClose , theArtist , onSave, addcomment,addtowishlist ,removewishlist , inWishlist , buyrequest}) => {
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
      const comment=newReview.comment;
      const rating=newReview.rating;
     addcomment({comment,rating});
    };

    
    
    // to do --> handle the buy 

    const HandleBuyRequest =(post)=>{
      console.log('buy request for : ' + post.artname);
      buyrequest(post);
      onClose();
      
    }

  return (  
    <>
    { console.log(post)}
    <div className="popup-art">
        <div className="popup-overlay-art" onClick={onClose}></div>
        <div className="popup-content-art">
          <button className="close-button-art" onClick={onClose}>
            ✖
          </button>
          <div className="popup-left-art">
            <img src={post.photo} alt={post.artname} className="popup-image-art" />
          </div>
          <div className="popup-right-art">

            {theArtist === false && <div className="popup-creator-info-art">
              <img
                src={post.profilePic}
                alt={`${post.artistName}'s profile`}
                className="popup-profile-pic-art"
              />
              <p className="popup-username-art">{post.artistName}</p>
            </div> 
            }
            <h2 className="art-title-art">{post.artname}</h2>
            <p className="art-description-art"><strong>Description:</strong> {post.description}</p>
            <p className="base-price-art"><strong>Base Price:</strong> {post.basePrice}</p>
             
            {theArtist === false ? 
  <>
    <div className="popup-buttons-art">
      {inWishlist === false ? 
        <button className="add-wishlist-button-art" onClick={()=>{addtowishlist(post); onClose();}}>
          Add to Wishlist
        </button>
       : 
        <button className="add-wishlist-button-art" onClick={()=>{removewishlist(post); onClose();}}>
          Remove from Wishlist
        </button>
      }
      <button className="add-review-button-art" onClick={handleAddReview}>
        Add Review
      </button>
    </div>
    <button className="buy-now-button-art" onClick={HandleBuyRequest}>Buy Now</button>
  </>
 : 
  <button className="Edit-art-info-art" onClick={handleEditArt}>
    Edit
  </button>
}

            
          <div className="comment-section-art">
            <h3>Comments</h3>
            <CommentSection comments={post.comments} />
          </div>
        </div>
      </div>
    </div>
    {isReviewPopupOpen && (
      console.log("Review Popup Open"),
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
