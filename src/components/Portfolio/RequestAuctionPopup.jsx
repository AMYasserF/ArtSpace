import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../css/AuctionPopup.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/custom-datepicker.css';

const RequestAuction = ({ art, SendRequest, onclose }) => {
    const [requestinfo, setrequestinfo] = useState({
        basePrice: "",
        startdate: null,
        enddate: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setrequestinfo((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleDateChange = (date, fieldName) => {
        setrequestinfo((prevDetails) => ({ ...prevDetails, [fieldName]: date }));
    };

    const handleSubmit = () => {
        const { basePrice, startdate, enddate } = requestinfo;

        if (!basePrice || !startdate || !enddate) {
            toast.error("Please Fill All The Fields");
            return;
        }

        // Convert dates to UTC before sending to the backend
        const formattedStartDate = new Date(
            startdate.getTime() - startdate.getTimezoneOffset() * 60000
        ).toISOString();

        const formattedEndDate = new Date(
            enddate.getTime() - enddate.getTimezoneOffset() * 60000
        ).toISOString();

        const auctionRequest = {
            basePrice,
            startdate: formattedStartDate,
            enddate: formattedEndDate,
        };

        SendRequest(art, auctionRequest);
        onclose();
    };

    return (
        <div className='auction-request-popup'>
            <div className='auction-request-content'>
                <h2>Request Auction</h2>
                <ToastContainer />

                <input
                    className="base-price-auction-request"
                    placeholder="Desired base price"
                    type="number"
                    name="basePrice"
                    value={requestinfo.basePrice}
                    onChange={handleInputChange}
                    min="0"
                />

                <DatePicker
                    className="start-date-auction-request"
                    selected={requestinfo.startdate}
                    onChange={(date) => handleDateChange(date, 'startdate')}
                    placeholderText="Auction Start Date"
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    required
                />

                <DatePicker
                    className="end-date-auction-request"
                    selected={requestinfo.enddate}
                    onChange={(date) => handleDateChange(date, 'enddate')}
                    placeholderText="Auction End Date"
                    dateFormat="yyyy-MM-dd"
                    minDate={requestinfo.startdate || new Date()}
                    required
                />

                <div className="popup-buttons-auction-request">
                    <button onClick={handleSubmit}>Submit Request</button>
                    <button onClick={onclose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RequestAuction;
