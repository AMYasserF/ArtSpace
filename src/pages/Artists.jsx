import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/artists.css';
import { ColorRing } from 'react-loader-spinner'; 

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Following , setFollowing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('http://localhost:3000/client/getArtists');
        const response2 = await axios.get('http://localhost:3000/client/getFollowings');
        setFollowings(response2.data);
        setArtists(response.data);
        console.log(response.data);
        console.log(response2.data);
      } catch (error) {
        console.log('Error fetching user arts', error.response?.data || error.message);
        toast.error('Failed to load artists');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchArtists();
  }, []); // Empty dependency array ensures this runs only once on mount

  

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('http://localhost:3000/client/getFollowings');
        setFollowing(response.data);
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

  useEffect(()=>{
  const setIsFollow = () =>{ 
    return artists.map(artist => ({
      ...artist,
      isFollowed: following.some(follow => follow.userid === artist.userid) // Check if artist.id exists in following
    }));
  
  }

  setIsFollow();
  } , [Following])

  const handleViewPortfolio = (artistName) => {
    navigate(`/portfolio/preview/${artistName}`);
  };

  const handleAddFollow = async (artist) => {
    console.log(`Add follow request: ${artist.username}`);
    try {
      const response = await axios.post('http://localhost:3000/client/addFollower', {
        artistId: artist.userid,
      });
      console.log(response.data);
      setFollowing([...Following , artist]);
      toast.success('Follower added successfully');
    } catch (err) {
      console.log('Error in adding follow');
      toast.error('Follower could not be added');
    }
  };

  const handleUnFollow = async (artist) => {
    console.log(`Add follow request: ${artist.username}`);
    try {
      const response = await axios.post('http://localhost:3000/client/removeFollower', {
        artistId: artist.userid,
      });
      console.log(response.data);
      toast.success('Follower added successfully');
    } catch (err) {
      console.log('Error in adding follow');
      toast.error('Follower could not be added');
    }
  };
  const handleUnFollow = async (artist) => {
    followings.filter((artistt) => artistt.userid !== artist.userid);
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
          {artists.map((artist) => (
            <div className="artists-preview-card" key={artist.userid}>
              <img className="artists-preview-profile-pic" src={artist.profilepic} alt={`${artist.username}'s profile`} />

              <div className="artist-preview-artist-info">
                <h3 className="artists-preview-artist-name">{artist.username}</h3>
                <p className="arists-preview-artist-realname">{artist.name}</p>
              </div>

              <div className="artists-preview-buttons">

          

                {!followings.find((artistt) => artistt.userid === artist.userid)? <button className="follow-artist" onClick={() => handleAddFollow(artist)}>
                  Follow
                </button>:<button className="follow-artist" onClick={() => handleUnFollow(artist)}>Unfollow</button>}

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

export default Artists;
