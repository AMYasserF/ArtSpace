import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/artists.css';
import { ColorRing } from 'react-loader-spinner'; 

const FollowList = () => {
  const [Follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('http://localhost:3000/client/getFollowings');
        setFollows(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching user arts', error.response?.data || error.message);
        toast.error('Failed to load followings');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFollow();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleViewPortfolio = (artistName) => {
    navigate(`/portfolio/preview/${artistName}`);
  };

  const handleUnFollow = async (artist) => {
    console.log(`Add follow request: ${artist.username}`);
    try {
      const response = await axios.post('http://localhost:3000/client/removeFollower', {
        artistId: artist.userid,
      });
      console.log(response.data);
      toast.success('Follower removed successfully');
    } catch (err) {
      console.log('Error in adding follow');
      toast.error('Follower could not be removed');
    }
  };

  return (
    <div className="allartistspage">
            <ToastContainer/>
      <h2 className="h2-artists-page">Available Artists</h2>

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
      ) : (
        <div className="all-artists-table">
          {Follows.map((artist) => (
            <div className="artists-preview-card" key={artist.userid}>
              <img className="artists-preview-profile-pic" src={artist.profilepic} alt={`${artist.username}'s profile`} />

              <div className="artist-preview-artist-info">
                <h3 className="artists-preview-artist-name">{artist.username}</h3>
                <p className="arists-preview-artist-realname">{artist.name}</p>
              </div>

              <div className="artists-preview-buttons">
                <button className="follow-artist" onClick={() => handleUnFollow(artist)}>
                  Unfollow
                </button>
                <button className="view-artist-profile" onClick={() => handleViewPortfolio(artist.username)}>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowList;
