import React from 'react';
import axios from 'axios';
import '../css/Gallery.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Followings = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [followings, setfollowings] = useState([]);
    useEffect(() => {
      const fetchArtists = async () => {
        try {
          const response = await axios.get("http://localhost:3000/client/getFollowings");
          setfollowings(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("Error fetching user arts", error.response?.data || error.message);
        }
      };
  
      fetchArtists();
    }, []); // Empty dependency array ensures this runs only once on mount
    const handleUnfollow = async (artist) => {
        console.log(`unfollow request:${artist.name}`);
        try{
            const response = await axios.post("http://localhost:3000/client/removeFollower",{
                artistId:artist.id
            });
            console.log(response.data);
            toast.success("Unfollowed Successfully");
        }
        catch(err){
            console.log("Error in adding follow");
            toast.fail("Unfollow could not be done");
        }
    }

}
export default Followings;