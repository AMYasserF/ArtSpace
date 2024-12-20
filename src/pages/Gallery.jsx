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
import { useRef } from 'react';


const Gallery = (Logged) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [wishlist , setWishlist] = useState([]);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasUpdatedArts = useRef(false); 

  useEffect(() => {
    let isMounted = true; 

    const fetchArts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:3000/arts");
        if (isMounted) {
        setArts(response.data);
        console.log(response.data);
        }
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
      
    
  }
    fetchArts();
    return () => {
      isMounted = false; // Cleanup to prevent state updates after unmount
    };
    
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchwishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/client/getWishlist");
      setWishlist(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching wishlists", error.response?.data || error.message);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Logged:", Logged);
    if(Logged==="true"){
      console.log("Fetching wishlist");
    fetchwishlist();
  }
}, []); 


  useEffect(() => {
   
    if (!hasUpdatedArts.current && arts.length > 0 && wishlist.length >= 0) {
      const updatedArts = arts.map(art => ({
        ...art,
        inWishlist: wishlist.some(item => item.artid === art.artid),
      }));
      console.log("Updated Arts:", updatedArts);
      setArts(updatedArts); 
      setLoading(false)
      hasUpdatedArts.current = true; 
    }
  }, [arts, wishlist]);



  function handlePostClick (post){
    console.log (post);
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
      setWishlist([...wishlist , art])
        hasUpdatedArts.current = false;
    }
      catch(err)
      {
        console.log("Error in adding to wishlist");
        toast.error("Could not be added to wishlist");
      }
    }
   
    async function handleRemovefromWishlsit (art) {
      console.log("art removed from wishlist:" + art.artname);

      try{
          const response = await axios.delete("http://localhost:3000/client/RemoveWishlist",{
            params: { artId: art.artid }
          });
          console.log(response.data);
          toast.success("Removed from wishlist");
          setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== art.id));
          hasUpdatedArts.current = false;
         
        }
        catch(err){
          console.log("Error in removing from wishlist");
          toast.error("Error Removing form Wishlist");
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
          baseprice: art.baseprice,
          createdAt: art.realeasedate,
          profilePic: art.artistPic,
          inWishlist: art.inWishlist
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
         addtowishlist={handleAddArtToWishlist}  
         removewishlist={handleRemovefromWishlsit} 
         inWishlist={selectedPost.inWishlist}
         buyrequest={handleBuy}/>}
        </>)}
        </div>
  
    
  );
};

export default Gallery;
