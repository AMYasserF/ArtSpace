import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ReceiptDetailsPopup from '../components/receipt/ReceiptDetailsPopup';
import { ColorRing } from 'react-loader-spinner';
import '../css/wishlist.css';
import { ColorRing } from 'react-loader-spinner';
import ArtPopUp from '../components/gallery/ArtPopUp';

const Wishlist = () => {
    const [selectedArt, setSelectedArt] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [loading , setLoading] = useState(false); // set it to true when fetch data is finished

    
    useEffect(() => {
      const fetchwishlist = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:3000/client/getWishlist");
          setWishlist(response.data);
          console.log(response.data);
        } catch (error) {
          console.log("Error fetching receipts", error.response?.data || error.message);
        }
        finally{
          setLoading(false);
        }
      };
  
      fetchwishlist();
    }, []); // Empty dependency array ensures this runs only once on mount

    




    function handleAddComment(comment){
        console.log(comment);
        console.log(selectedPost.id);
        const newComment = {
          artId: selectedPost.id,
          comment: comment.description,
          rate: comment.rate
        }
        try{
          const response = axios.post("http://localhost:3000/client/review",newComment);
          console.log(response.data);
          selectedPost.comments.push(comment);
          toast.success("Comment added Successfully");
          
        }
        catch(err){
          console.log("Error in adding comment");
          toast.error("Could not be added");
        }
      }

      const handleRemovefromWishlsit = (art) => {
        console.log("art removed from wishlist:" + art.artname);

        try{
            const response = axios.delete("http://localhost:3000/client/removeWishlist",{
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

        const handleBuy =(art) =>{
            console.log("buy request invoked");
            console.log(art);
        
            // handle back
          }

      

   return (
    <div className='user-wishlsit-page'>
    <h2 className='h2-wishlist-page'>Wishlist</h2>

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
                ) : ( <>
    <div className='wishlist-table'>
      
     { wishlist.map((art) => { 
 
      return (
        <>
        <div className='wishlist-card' key={art.artid} onClick={setSelectedArt(art)} > 
        <img className='wishlist-art-pic' src={art.artpic} />

        <div className='wishlist-art-info'>
        <h3 className='wishlist-preview-art-name' >  {art.artname}    </h3>
        <p className='wishlist-preview-artist-name'> {art.artistname} </p>
        <p className='wishlist-preview-price'> price:{art.baseprice}      </p>
        </div>
        
      
        <button className='remove-button-wishlist' onClick={()=>handleRemovefromWishlsit(art)}>Remove From wishlist</button>
        
        </div>
        {selectedArt && <ArtPopUp 
                post={selectedPost} 
                onClose={() => setSelectedArt(false)} 
                theArtist={false}  
                addcomment={handleAddComment}  
                removewishlist={handleRemovefromWishlsit} 
                inwishlist={true}
                buyrequest={handleBuy}/>}
        </>
      )
      })}
    </div>
</>)}

    </div>
   )
}
export default Wishlist;