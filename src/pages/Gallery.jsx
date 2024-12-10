import React from 'react';
import Post from '../components/gallery/Post';
import Popup from '../components/gallery/ArtPopUp';
import axios from 'axios';
import '../css/Gallery.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Comment from '../components/gallery/Comment';



const Gallery = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [arts, setArts] = useState([]);
  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/arts");
        setArts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
    };

    fetchArts();
  }, []); // Empty dependency array ensures this runs only once on mount
  function handlePostClick (post){
        setSelectedPost(post);
  }

  function handlePostClose() {
    setSelectedPost(null);
  }
    const posts = [];
      arts.map((art) =>{
        posts.push({
          id: art.artid,
          title: art.artname,
          imageUrl: art.photo,
          description: art.description,
          artistName: art.artistName,
          artistId: art.artistId,
          basePrice: art.basePrice,
          createdAt: art.realeasedate,
          profilePic: art.artistPic,
          comments: art.comments
        });
      })
  return (
    <div className="gallery">
      {posts.map((post) => (
        <Post 
        key={post.id}
        post={post} 
        onClick={()=>handlePostClick(post)} 
         />
      ))}
      {selectedPost && <Popup post={selectedPost} onClose={() => handlePostClose()} theArtist={false} />}

    </div>
  );
};

export default Gallery;
