import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../css/ArtPopUp.css';
import CommentSection from './CommentSection';
import ReviewPopUp from './ReviewPopUp';
import { ColorRing } from 'react-loader-spinner';
import EditArtPopup from '../Portfolio/EditArtPopup';
import ConfirmPurchasePopup from './ConfirmBuyPopup';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ArtPopUp = ({ post, onClose , theArtist , onSave,addtowishlist ,removewishlist , inWishlist , buyrequest}) => {
    const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);
    const [isEditPopupOpen , setEditPopupOpen] = useState(false);
    const [isBuynow , SetBuynow] = useState(false);
    const [isloading , setLoading] = useState(true);
    const [Commentsload , setCommentload] = useState([]);
    

    

    const handleAddReview = () => {
      setReviewPopupOpen(true);
    };

    const handleEditArt =() => {
        setEditPopupOpen(true);
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/arts/comments", {
          params: { artid: post.artid }
        });
        setCommentload(response.data); 
        console.log("Comments fetched:", response.data);
      } catch (error) {
        console.log("Error fetching comments", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchComments(); 
    }, []);
    

    async function handleAddComment(review){
      const newComment = {
        artId: post.artid,
        comment: review.comment,
        rate: review.rating
      }
      console.log('Comment is:',newComment);
      try{
        const response = await axios.post("http://localhost:3000/client/review",newComment);
        console.log("this" +response.data);
        console.log("here");
       
       

        toast.success("Comment added Successfully");
        fetchComments();
      }
      catch(err){
        console.log("Error in adding comment");
        toast.error("Could not be added");
      }
    }
  

    // to do --> handle the buy 

    const HandleBuyRequest = async (post,purchasedescription)=>{
      console.log('buy request for : ' + post.artname);

      try{
        const response = await axios.post("http://localhost:3000/client/buy",{
          artId:post.artid,
          description:purchasedescription
        });
        console.log(response.data);
        toast.success("Purchase successful! Thank you for your order.");
        
      }
      catch(err){
        console.log("Error in adding comment");
        toast.error("Could not be added");
      }
      
      
    }

    

  return (  <>
    <div className="popup-art">
    <ToastContainer className="toast-container"/>
     {isloading ? ( // Show loader while loading
                 <div className="spinner-container">
                   <ColorRing
                     visible={true}
                     height={80}
                     width={80}
                     ariaLabel="color-ring-loading"
                     colors={['#83905a' , '#98a724','#868d05','#4b7c01']} 
                   />
                 </div>
               ) : (<>
  
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
            {post.baseprice&&<p className="base-price-art"><strong>Base Price:</strong> {post.baseprice}$</p>}
             
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
    {post.baseprice && <button className="buy-now-button-art" onClick={(()=>SetBuynow(true))}>Buy Now</button>}
  </>
 : 
  <button className="Edit-art-info-art" onClick={handleEditArt}>
    Edit
  </button>
}

            
          <div className="comment-section-art">
            <h3>Comments</h3>
            <CommentSection comments={Commentsload} />
          </div>
        </div>
      </div>
      </>)}
    </div>

    {isReviewPopupOpen && (
      console.log("Review Popup Open"),
        <ReviewPopUp
          onClose={() => setReviewPopupOpen(false)}
          onSubmit={handleAddComment}
        />
      )}

    {isEditPopupOpen && (
        <EditArtPopup
        art = {post}
          onClose={() => setEditPopupOpen(false)}
          onSave={onSave}
          />
    )}
    {isBuynow && 
    <ConfirmPurchasePopup 
       art = {post}
       onClose={() => SetBuynow(false)}
       onConfirm = {HandleBuyRequest}
       />  }

    </>
  );
};

export default ArtPopUp;
