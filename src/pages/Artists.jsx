import React from 'react';
import axios from 'axios';
import '../css/Gallery.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Artists = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [artists, setArtists] = useState([]);
    useEffect(() => {
      const fetchArtists = async () => {
        try {
          const response = await axios.get("http://localhost:3000/client/getArtists");
          setArtists(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("Error fetching user arts", error.response?.data || error.message);
        }
      };
  
      fetchArtists();
    }, []); // Empty dependency array ensures this runs only once on mount
    const handleAddFollow = async (artist) => {
        console.log(`add follow request:${artist.name}`);
        try{
            const response = await axios.post("http://localhost:3000/client/addFollower",{
                artistId:artist.id
            });
            console.log(response.data);
            toast.success("follower added Successfully");
        }
        catch(err){
            console.log("Error in adding follow");
            toast.fail("follower could not be added");
        }
    }
}
export default Artists;