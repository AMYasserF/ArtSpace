import React from 'react';
import { useState } from 'react';
import "../../css/AuctionPopup.css"
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestAuction = ({art , SendRequest , onclose })=>{
const [requestinfo , setrequestinfo] = useState({
    basePrice:"" ,
    startdate : "",
    enddate: ""
});

const transformToPostgresDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setrequestinfo((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = () => {
    if (!requestinfo.basePrice || !requestinfo.startdate||  !requestinfo.enddate) {

      toast.error("Please Fill All The Fields");
      return;

    
    }
   
   let theStartdate = transformToPostgresDate(requestinfo.startdate);
    let theEnddate = transformToPostgresDate(requestinfo.enddate);

    requestinfo.startdate = theStartdate;
    requestinfo.enddate = theEnddate;

    SendRequest(art , requestinfo); 
    onclose(); 
  };


return (
  
<div className='auction-request-popup' >
    <div className='auction-request-content'>
    <h2>Request Auction</h2>
    <ToastContainer/>

    <input
            className="base-price-auction-request"
            placeholder="Desired base price"
            type="number"
            name="basePrice"
            value={requestinfo.basePrice}
            onChange={handleInputChange}
            min="0"
          />  

          <input
          className="start-date-auction-request"
           placeholder="Auction Start Date: DD/MM/YY"
            type="text"
            name="startdate"
            value={requestinfo.startdate}
            onChange={handleInputChange}
            required
          />
          <input
            className="end-date-auction-request"
            placeholder="Auction End Date: DD/MM/YY"
            name="enddate"
            value={requestinfo.enddate}
            onChange={handleInputChange}
            required
          />
          
        
        <div className="popup-buttons-auction-request">
          <button onClick={handleSubmit}>Submit Request</button>
          <button onClick={onclose}>Cancel</button>
        </div>
    </div>

</div>
)


}

export default RequestAuction;