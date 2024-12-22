import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "bootstrap";

const AuctionsWon = () => {
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/client/wonAuctions")
      .then((response) => {
        console.log(response.data);
        setWonAuctions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handlePayAndGenerateReceipt = (auction) => {
    axios.post(`http://localhost:3000/client/buy/auction`,{
        artId: auction.artid,
        price: auction.highestbid,
        description: "Payment for auction",
    })
      .then((response) => {
        toast.success("Payment successful ,Congrats, the digital copy of this art is now yours !");
      })
      .catch((err) => {
        console.error("Error generating receipt", err);
        toast.error("Error generating receipt");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading auctions: {error.message}</p>;

  return (
    <div className="container mt-5">
      <ToastContainer/>
      <h1 className="mb-4">Won Auctions</h1>
      <div className="row">
        {wonAuctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <h2>{auction.artname}</h2>
            <p><strong>Winning Bid:</strong> ${auction.highestbid}</p>
            <p><strong>End Date:</strong> {new Date(auction.endtime).toLocaleDateString()}</p>
            <div><img src={auction.photo} alt={auction.artname} /></div>
            {!(auction.paid===true)?<button 
              onClick={() => handlePayAndGenerateReceipt(auction)} 
              className="btn btn-primary"
            >
              Pay and Generate Receipt
            </button>:<p>Congrats, the digital copy of this art is now yours !</p>}
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default AuctionsWon;