import React from 'react';
import '../../css/ConfirmBuyPopup.css';
import { useState , useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const ConfirmPurchasePopup = ({ art, onClose, onConfirm }) => {

const[CardNumber , setCardNumber] = useState("");
const[CardExpireDate , setCardExpireDate] = useState("");
const[purchaseDesc , setpurchaseDesc] = useState("");

  useEffect(() => {
    // Fetch user data
    axios.get(`http://localhost:3000/user/data`)
      .then(response => {
        setCardNumber(response.data.cardnumber || '');
        setCardExpireDate(response.data.expiredate || '');
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  const HandleBuy= ()=>{
    if (!CardNumber) {
      toast.error("No card added. Please add a card before proceeding.", "error");
      return;
    }
  
    const currentDate = new Date();
    const expireDate = new Date(CardExpireDate);
  
    if (currentDate > expireDate) {
      toast.error("Your card has expired. Please use a valid card.", "error");
      return;
    }
  
    onConfirm(art, purchaseDesc);
    onClose();
  
  }


  return (
    <div className="confirm-purchase-popup">
      <ToastContainer  className="toast-container"/>
      <div className="popup-overlay-confirm" onClick={onClose}></div>
      <div className="popup-content-confirm">
        <button
          className="close-button-confirm"
          onClick={onClose}
          aria-label="Close Confirm Purchase Popup"
        >
          ✖
        </button>
        <div className="popup-layout-confirm">
          <div className="popup-header-confirm">
            <h2>Confirm Your Purchase</h2>
          </div>
          <div className="popup-body-confirm">
            <div className="popup-section-confirm">
              <h3>Art Details</h3>
              <img
                src={art.photo}
                alt={art.name}
                className="popup-image-confirm"
              />
              <p><strong>Art Name:</strong> {art.artname}</p>
              <p><strong>Description:</strong> {art.description}</p>
            </div>
          
            <div className="popup-section-confirm">
              <h3>Transaction Summary</h3>
              <p><strong>Price:</strong> ${art.baseprice}</p>

           
             <p><strong>Current Card:</strong> {`****${CardNumber.slice(-2)}`}</p> 

             
            </div>

            <div className='popup-section-confirm'>
              <h3>Purchase Description</h3>
              <textarea
                className="description-confirm"
                 placeholder="add notes..."
                 value={purchaseDesc}
                 onChange={(e) => setpurchaseDesc(e.target.value)}
                 ></textarea>
            </div>

          </div>
          <div className="popup-footer-confirm">
            <button className="confirm-button" onClick={HandleBuy}>
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchasePopup;
