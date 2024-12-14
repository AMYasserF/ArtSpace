import React from 'react';
import Post from '../components/gallery/Post';
import Popup from '../components/gallery/ArtPopUp';
import axios from 'axios';
import '../css/Gallery.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';


const Gallery = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchArts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:3000/arts");
        setArts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
     finally {
      setLoading(false); // Stop loading
    };
  }
    fetchArts();
  }, []); // Empty dependency array ensures this runs only once on mount
  function handlePostClick (post){
        setSelectedPost(post);
  }

  async function handleAddArtToWishlist(art){
    console.log(art);
    try{
      const response = await axios.post("http://localhost:3000/client/addWishlist",{
        artId:art.artid
      });
      console.log(response.data);
      toast.success("Added to wishlist Successfully");
      art.inwhishlist = true;
    }
      catch(err)
      {
        console.log("Error in adding to wishlist");
        toast.error("Could not be added to wishlist");
      }
    }
   
   async function handleRemovefromWishlsit (art)  {
      console.log("art removed from wishlist:" + art.artname);

      try{
          const response = await axios.delete("http://localhost:3000/client/removeWishlist",{
              artId : art.artid
          });
          console.log(response.data);
          toast.success("Removed from wishlist");
          
        }
        catch(err){
          console.log("Error in removing from wishlist");
          toast.error("Error Removing form Wishlist");
        }
      }

      


  async function handleAddComment(comment){
    console.log(comment);
    console.log(selectedPost.id);
    const newComment = {
      artId: selectedPost.artid,
      comment: comment.description,
      rate: comment.rate
    }
    try{
      const response = await axios.post("http://localhost:3000/client/review",newComment);
      console.log(response.data);
      selectedPost.comments.push(comment);
      toast.success("Comment added Successfully");
      
    }
    catch(err){
      console.log("Error in adding comment");
      toast.error("Could not be added");
    }
  }

  const handleBuy =(art) =>{
    console.log("buy request invoked");
    console.log(art);

    // handle back
  }
  function handlePostClose() {
    setSelectedPost(null);
  }
    const posts = [];
      arts.map((art) =>{
        posts.push({
          artid: art.artid,
          artname: art.artname,
          photo: art.photo,
          description: art.description,
          artistName: art.artistName,
          artistId: art.artistId,
          basePrice: art.basePrice,
          createdAt: art.realeasedate,
          profilePic: art.artistPic,
          comments: art.comments,
          inwishlist: false
        });
      })
  return (
    <div className="gallery">
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
            ) : (<>
      <ToastContainer/>
      {posts.map((post) => (
        <Post 
        key={post.artid}
        post={post} 
        onClick={()=>handlePostClick(post)} 
         />
      ))}
      {selectedPost && <Popup 
         post={selectedPost} 
         onClose={() => handlePostClose()} 
         theArtist={false}  
         addcomment={handleAddComment} 
         addtowishlist={handleAddArtToWishlist}  
         removewishlist={handleRemovefromWishlsit} 
         inWishlist={selectedPost.inwishlist}
         buyrequest={handleBuy}/>}
        </>)}
        </div>
  
    
  );
};

export default Gallery;
