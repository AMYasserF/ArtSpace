import React from 'react';
import '../../css/ReceiptDetailsPopup.css'

const ReceiptDetailsPopup = ({ receipt, onClose }) => {

  
  return (
    <div className="Receipt-details-popup">
      <div className="popup-overlay-Receipt" onClick={onClose}></div>
      <div className="popup-content-receipt">
        <button className="close-button-receipt" onClick={onClose}>
          ✖
        </button>
        <div className="popup-layout-receipt">
          <div className="popup-header-receipt">
            <h2>Receipt Details</h2>
          </div>
          <div className="popup-body-receipt">
            <div className="popup-section">
              <h3>Seller Information</h3>
              <p><strong>Seller Name:</strong> {receipt.artistname}</p>
            </div>
            <div className="popup-section">
              <h3>Buyer Information</h3>
              <p><strong>Sold To:</strong> {receipt.buyerName}</p>
            </div>
            <div className="popup-section">
              <h3>Art Details</h3>
              <img src={receipt.artpic} alt={receipt.artname} className="popup-image-receipt" />
              <p><strong>Art Name:</strong> {receipt.artname}</p>
              <p><strong>Description:</strong> {receipt.artdescription}</p>
            </div>
            <div className="popup-section">
              <h3>Transaction Details</h3>
              <p><strong>Date:</strong> {receipt.recieptdate.slice(0,10)}</p>
              <p><strong>Price Paid:</strong> {receipt.price}</p>
              <p><strong>Card Number:</strong> **** **** **** {receipt.cardNumber.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailsPopup;
