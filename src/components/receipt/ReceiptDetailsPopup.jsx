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
              <p><strong>Seller Name:</strong> {receipt.sellerName}</p>
            </div>
            <div className="popup-section">
              <h3>Buyer Information</h3>
              <p><strong>Sold To:</strong> {receipt.buyerName}</p>
            </div>
            <div className="popup-section">
              <h3>Art Details</h3>
              <img src={receipt.art.photo} alt={receipt.art.name} className="popup-image-receipt" />
              <p><strong>Art Name:</strong> {receipt.art.name}</p>
              <p><strong>Description:</strong> {receipt.art.description}</p>
            </div>
            <div className="popup-section">
              <h3>Transaction Details</h3>
              <p><strong>Date:</strong> {receipt.date}</p>
              <p><strong>Price Paid:</strong> {receipt.pricePaid}</p>
              <p><strong>Card Number:</strong> **** **** **** {receipt.cardNumber.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailsPopup;
