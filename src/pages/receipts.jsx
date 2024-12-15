import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ReceiptDetailsPopup from '../components/receipt/ReceiptDetailsPopup';
import { ColorRing } from 'react-loader-spinner';
import '../css/receipts.css';


const Reciepts = () => {
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receipts, setreceipts] = useState([]);
    const [loading , setLoading] = useState(false); // set it to true when fetch data is finished

    /*
    useEffect(() => {
      const fetchreceipts = async () => {
        try {
          setLoading(true);
          //const response = await axios.get("http://localhost:3000/client/getReceipts");
         // setreceipts(response.data);
          //console.log(response.data);
        } catch (error) {
          console.log("Error fetching receipts", error.response?.data || error.message);
        }
        finally{
          setLoading(false);
        }
      };
  
      fetchreceipts();
    }, []); // Empty dependency array ensures this runs only once on mount

    */
useEffect(()=>{
  setreceipts(sampleReceipts);

}, [])
const sampleReceipts = [
  {
    receiptid: 1,
    artname: "Golden Horizon",
    artistname: "Alice Johnson",
    price: 500,
    artpic: "https://via.placeholder.com/100x100", // Placeholder image
    date: "2024-11-25",
    pricePaid: "$500",
    cardNumber: "1234567812345678",
    sellerName: "Alice Johnson",
    buyerName: "John Doe",
    art: {
      name: "Golden Horizon",
      photo: "https://via.placeholder.com/200x200", // Larger image for popup
      description: "A serene depiction of a golden sunset over a peaceful landscape.",
    },
  },
  {
    receiptid: 2,
    artname: "Emerald Dreams",
    artistname: "Mark Stevens",
    price: 750,
    artpic: "https://via.placeholder.com/100x100", // Placeholder image
    date: "2024-11-26",
    pricePaid: "$750",
    cardNumber: "2345678923456789",
    sellerName: "Mark Stevens",
    buyerName: "Jane Smith",
    art: {
      name: "Emerald Dreams",
      photo: "https://via.placeholder.com/200x200", // Larger image for popup
      description: "An abstract representation of the vibrant hues of emerald green.",
    },
  },
  {
    receiptid: 3,
    artname: "Ruby Skies",
    artistname: "Sophie Carter",
    price: 300,
    artpic: "https://via.placeholder.com/200x200", // Placeholder image
    date: "2024-11-27",
    pricePaid: "$300",
    cardNumber: "3456789034567890",
    sellerName: "Sophie Carter",
    buyerName: "Emily Davis",
    art: {
      name: "Ruby Skies",
      photo: "https://via.placeholder.com/200x200", // Larger image for popup
      description: "A breathtaking view of a ruby-red sunset over the mountains.",
    },
  },
  {
    receiptid: 4,
    artname: "Mystic Waters",
    artistname: "Ethan Brown",
    price: 450,
    artpic: "https://via.placeholder.com/100x100", // Placeholder image
    date: "2024-11-28",
    pricePaid: "$450",
    cardNumber: "4567890145678901",
    sellerName: "Ethan Brown",
    buyerName: "Michael Lee",
    art: {
      name: "Mystic Waters",
      photo: "https://via.placeholder.com/200x200", // Larger image for popup
      description: "A tranquil depiction of a mystical river under the moonlight.",
    },
  },
];


     
   return (
    <div className='user-receipts-page'>
    <h2 className='h2-receipts-page'>Receipts</h2>

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
                ) : ( <>
    <div className='receipts-table'>
      
     { receipts.map((receipt) => { 
 
      return (
        <>
        <div className='receipts-card' key={receipt.receiptid} > 
        <img className='artists-preview-profile-pic' src={receipt.artpic} />

        <div className='receipt-preview-info'>
        <h3 className='receipt-preview-art-name' >  {receipt.artname}    </h3>
        <p className='receipt-preview-artist-name'> {receipt.photo}      </p>
        <p className='receipt-preview-payed'> price:{receipt.price}      </p>
        </div>
        
      
        <button className='view-receipt-details' onClick={()=>setSelectedReceipt(receipt)}>View Details</button>
        
        </div>
        {selectedReceipt && <ReceiptDetailsPopup receipt={selectedReceipt} onClose={()=>setSelectedReceipt(null)} />}
        </>
      )
      })}
    </div>
</>)}

    </div>
   )
}
export default  Reciepts;