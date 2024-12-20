import React, { useState, useEffect } from 'react';
import '../css/Auction.css'; 

const Auction = ({ startTime, endTime, winnerName }) => {
    const [lastBid, setLastBid] = useState(500); // Initial last bid amount
    const [userBid, setUserBid] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [status, setStatus] = useState('coming_soon'); // 'coming_soon', 'ongoing', 'ended'

    useEffect(() => {
        const currentTime = Date.now();
        
        if (currentTime < startTime) {
            setStatus('coming_soon');
            setCountdown(startTime - currentTime);
        } else if (currentTime > endTime) {
            setStatus('ended');
            setCountdown(0);
        } else {
            setStatus('ongoing');
            setCountdown(endTime - currentTime);
        }

        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 0) {
                    clearInterval(timer);
                    setStatus('ended');
                    return 0;
                }
                return prevCountdown - 1000; // Decrease by 1 second
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [startTime, endTime]);

    const handleBidChange = (e) => {
        setUserBid(e.target.value);
    };

    const placeBid = () => {
        const newBid = parseFloat(userBid);
        if (!isNaN(newBid) && newBid > lastBid) {
            setLastBid(newBid);
            setUserBid('');
        } else {
            alert("Your bid must be higher than the last bid.");
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="container">
            <header>
                <h1>Art Auction</h1>
            </header>
            <main>
                <div className="art-image">
                    <img src="path_to_your_art_image.jpg" alt="Art Piece" />
                </div>
                <div className="auction-info">
                    {status === 'ongoing' && (
                        <div className="last-bid">
                            <h2>Last Bid:</h2>
                            <p id="last-bid-amount">${lastBid.toFixed(2)}</p>
                        </div>
                    )}
                    {status === 'coming_soon' && (
                        <div className="timer">
                            <h2>Time to Start:</h2>
                            <p>{formatTime(countdown)}</p>
                        </div>
                    )}
                    {status === 'ongoing' && (
                        <>
                            <div className="bid-input">
                                <label htmlFor="bid">Your Bid:</label>
                                <input
                                    type="number"
                                    id="bid"
                                    value={userBid}
                                    onChange={handleBidChange}
                                    placeholder="Enter your bid"
                                />
                                <button onClick={placeBid}>Place Bid</button>
                            </div>
                            <div className="timer">
                                <h2>Time Remaining:</h2>
                                <p>{formatTime(countdown)}</p>
                            </div>
                        </>
                    )}
                    {status === 'ended' && (
                        <div className="ended">
                            <h2>Auction has ended!</h2>
                            <p>Winner: {winnerName}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Auction;
