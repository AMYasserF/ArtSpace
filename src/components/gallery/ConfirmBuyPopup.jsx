import React from 'react';
import '../../css/ConfirmBuyPopup.css';

const ConfirmPurchasePopup = ({ art, onClose, onConfirm }) => {



  return (
    <div className="confirm-purchase-popup">
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

            {/* remove hard coded later */}
             <p><strong>Current Card:</strong> **** **** 4537</p> 

             
            </div>
          </div>
          <div className="popup-footer-confirm">
            <button className="confirm-button" onClick={onConfirm}>
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchasePopup;
