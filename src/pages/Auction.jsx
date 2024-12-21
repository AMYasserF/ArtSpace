import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Auction.css";
import { ToastContainer , toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner';
import "react-toastify/dist/ReactToastify.css";
import AuctionCard from "../components/auction/auctioncard.jsx";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Auction = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading , setloading] = useState(true);
  const [userBid, setUserBid] = useState('');
  const[selectedAuction , setSelectedAuction] = useState(null);


  const handleClose = () => setSelectedAuction(null);

  const handleBidChange = (e) => setUserBid(e.target.value);

  const handleBidSubmit = () => {
    // Handle bid submission logic here
    console.log(`Bid submitted: ${userBid}`);
    axios.post("http://localhost:3000/client/add/bid", {
      auctionId: selectedAuction.auctionid,
      bid: userBid,
      auctiondate: selectedAuction.starttime,
      baseprice: selectedAuction.startingbid,
      highestbid: selectedAuction.highestbid,
    }).then((response) => {
      console.log(response.data);
      toast.success("Bid submitted successfully");
    }).catch((err) => {
      console.error("Error submitting bid", err);
      toast.error("Error "+err.response.data);
    });
    handleClose();
  };


  useEffect(() => {
    const fetchAuctions = async () => {
     
      try {
        const response = await axios.get("http://localhost:3000/client/auctions");
        setAuctions(response.data);
      } catch (error) {
        console.error("Error fetching auctions", error);
      }
      finally{
        setloading(false);
      }
    };

    fetchAuctions();
    const interval = setInterval(fetchAuctions, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auctions-container">
        <h1 className="auction-h1">Auctions</h1>
     {loading ? ( // Show loader while loading
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
      <ToastContainer />
    
      <div className="auctions-page-grid">
        {auctions.map((auction) => (
          <div key={auction.auctionid}>
            <AuctionCard auction={auction} onClick={()=>setSelectedAuction(auction)} />
          </div>
        ))}
        </div>
        {selectedAuction && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Place Bid</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Last Bid: ${selectedAuction.highestbid}</label>
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

      </>
                )}
    </div>
  );
};

export default Auction;
