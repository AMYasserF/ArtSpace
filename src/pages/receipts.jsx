import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import '../css/receipts.css'

const Reciepts = () => {
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receipts, setreceipts] = useState([]);
    useEffect(() => {
      const fetchreceipts = async () => {
        try {
          //const response = await axios.get("http://localhost:3000/client/getReceipts");
          setArtists(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("Error fetching receipts", error.response?.data || error.message);
        }
      };
  
      fetchreceipts();
    }, []); // Empty dependency array ensures this runs only once on mount

    


   return (
    <div className='user-receipts-page'>
    <h2 className='h2-receipts-page'>Receipts</h2>
    <div className='receipts-table'>
     { receipts.map((receipt) => { 

      return (
        <div className='receipts-card' key={receipt.receiptid} > 
        <img className='artists-preview-profile-pic' src={receipt.artpic} />

        <div className='receipt-preview-indo'>
        <h3 className='receipt-preview-art-name' >  {receipt.artname}    </h3>
        <p className='receipt-preview-artist-name'> {receipt.artistname} </p>
        <p className='receipt-preview-payed'> price:{receipt.price}      </p>
        </div>
        
      
        <button className='view-receipt-details' onClick={()=>handleAddFollow(artist)}>View Details</button>
        
        </div>
        
      )
      })}
    </div>


    </div>
   )
}
export default Artists;