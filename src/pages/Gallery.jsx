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
    const fetchArtsAndWishlist = async () => {
  
      try {
        setLoading(true);
  
        
        let fetchedWishlist = [];
        if (Logged) {
          const result = await axios.get("http://localhost:3000/client/getWishlist");
          setWishlist(result.data);
          fetchedWishlist = result.data;
        }
  
        // Fetch the arts
        const response = await axios.get("http://localhost:3000/arts");
        const fetchedArts = response.data;
  
        // Check each art against the wishlist
        const updatedArts = fetchedArts.map((art) => ({
          ...art,
          inWishlist: fetchedWishlist.some((wishlistArt) => wishlistArt.artid === art.artid),
        }));
  
        setArts(updatedArts);
      } catch (error) {
        console.error("Error fetching arts or wishlist", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArtsAndWishlist();
  }, []);

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
      art.inWishlist =true;
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
          art.inWishlist=false;
         
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
    // const posts = [];
    //   arts.map((art) =>{
    //     posts.push({
    //       artid: art.artid,
    //       artname: art.artname,
    //       photo: art.photo,
    //       description: art.description,
    //       artistName: art.artistName,
    //       artistId: art.artistId,
    //       baseprice: art.baseprice,
    //       createdAt: art.realeasedate,
    //       profilePic: art.artistPic,
    //       inWishlist: art.inWishlist
    //     });
    //   })
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
      {arts.map((post) => (
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
