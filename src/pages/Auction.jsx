import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Auction.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const Auction = ( ) => {
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [userBid, setUserBid] = useState('');
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    const fetchAuctions = async () => {
        try {
            // Fetch auctions from the server
            const response=await axios.get("http://localhost:3000/client/auctions");
            console.log(response.data);
            setAuctions(response.data);
        } catch (error) {
            console.error('Error fetching auctions', error);
        }
    };
    fetchAuctions();
  }, []);
  const handleShow = (auction) => setSelectedAuction(auction);
  const handleClose = () => setSelectedAuction(null);

  const handleBidChange = (e) => setUserBid(e.target.value);

  const handleBidSubmit = () => {
    // Handle bid submission logic here
    console.log(`Bid submitted: ${userBid}`);
    handleClose();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Auctions</h1>
      <div className="row">
        {auctions.map((auction, index) => {
          const currentTime = Date.now();
          let status = 'coming_soon';
          let countdown = 0;

          if (currentTime < auction.startTime) {
            status = 'coming_soon';
            countdown = auction.startTime - currentTime;
          } else if (currentTime > auction.endTime) {
            status = 'ended';
            countdown = 0;
          } else {
            status = 'ongoing';
            countdown = auction.endTime - currentTime;
          }

          return (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Auction {index + 1}</h5>
                  <p className="card-text">Status: {status}</p>
                  <p className="card-text">Countdown: {countdown} ms</p>
                  <p className="card-text">Last Bid: ${auction.lastBid}</p>
                  <Button variant="primary" onClick={() => handleShow(auction)}>Place Bid</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAuction && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Place Bid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Last Bid: ${selectedAuction.lastBid}</label>
                <input
                  type="number"
                  className="form-control"
                  value={userBid}
                  onChange={handleBidChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleBidSubmit}>Submit Bid</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Auction;