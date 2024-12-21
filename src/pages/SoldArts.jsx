import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ReceiptDetailsPopup from '../components/receipt/ReceiptDetailsPopup';
import { ColorRing } from 'react-loader-spinner';
import '../css/receipts.css';


const SoldReciepts = () => {
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [receipts, setreceipts] = useState([]);
    const [loading , setLoading] = useState(true); // set it to true when fetch data is finished

    
    useEffect(() => {
      const fetchreceipts = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:3000/artist/sold");
          setreceipts(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("Error fetching receipts", error.response?.data || error.message);
        }
        finally{
          setLoading(false);
        }
      };
  
      fetchreceipts();
    }, []); // Empty dependency array ensures this runs only once on mount

    


     
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
        <p className='receipt-preview-artist-name'> {receipt.artistname}      </p>
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
export default  SoldReciepts;