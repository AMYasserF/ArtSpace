import React, { useState, useEffect } from "react";
import axios from "axios";

const AuctionsWon = () => {
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/client/auctions/won")
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
        artId: auction.id,
        price: auction.highestbid,
        description: "Payment for auction",
    })
      .then((response) => {
        alert("Payment successful and receipt generated!");
        // Optionally, update the state to reflect the payment status
      })
      .catch((err) => {
        console.error("Error generating receipt", err);
        alert("Failed to generate receipt. Please try again.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading auctions: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Won Auctions</h1>
      <div className="row">
        {wonAuctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <h2>{auction.title}</h2>
            <p><strong>Winning Bid:</strong> ${auction.winningBid}</p>
            <p><strong>End Date:</strong> {new Date(auction.endDate).toLocaleDateString()}</p>
            <button 
              onClick={() => handlePayAndGenerateReceipt(auction)} 
              className="btn btn-primary"
            >
              Pay and Generate Receipt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionsWon;