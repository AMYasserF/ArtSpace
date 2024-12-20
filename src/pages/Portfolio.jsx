import React, { useEffect, useState } from 'react';
import PortfolioCard from '../components/Portfolio/PortofolioCard.jsx';
import ArtPopUp from '../components/gallery/ArtPopUp';
import AddArtPopup from '../components/Portfolio/AddArtPopup.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

import '../css/Portfolio.css';

const Portfolio = ({viewonly , thename }) => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [addArt , setAddArt] = useState(false);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist , setWishlist] = useState([]);

  const { artistname } = useParams(); 

  useEffect(() => {
    
    const fetchArts = async () => {
      const requiredName = viewonly ? artistname : thename;
    
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:3000/client/arts" ,  {
          artistname : requiredName
        });
       
         setArts(response.data);
      } catch (error) {
        console.log("Error fetching user arts", error.response?.data || error.message);
      }
      finally{
        setLoading(false);
      }
    };

    fetchArts();
  },  [viewonly, artistname, thename]); // Empty dependency array ensures this runs only once on mount
 
  const fetchwishlist = async () => {
    try {
    
      const response = await axios.get("http://localhost:3000/client/getWishlist");
      setWishlist(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching wishlists", error.response?.data || error.message);
    }
    finally{
      
    }
  };

   useEffect(() => {
      console.log("Fetching wishlist");
      fetchwishlist();
    }
  , []); 



  const handleEditSave = async (updatedArt) => {
    try {
    setArts((prevArts) =>
      prevArts.map((art) => (art.artid === updatedArt.artid ? updatedArt : art))
    );
    const result = await axios.put("http://localhost:3000/arts/edit" , updatedArt)
    setSelectedArt(null);
   // console.log(result.data);
   toast.success("art updated successfully");

  }
  catch (error) {
    if(error.response){
      toast.error(error.response.data);
    }
    else
      toast.error("Internal server error sorry !");
    console.error("Error updating art:", error.response?.data || error.message);
  }
  };
  
  const handleArtClick =  (art) => {
    setSelectedArt(art);
  };

  const handleAuctionRequest = async (art , request) => {
   
    console.log(art);
    console.log(request);

    try{
      const result = await axios.post("http://localhost:3000/artist/art/auction" , {
        artId:art.artid,
        startDate:request.startdate,
        endDate: request.enddate,
        startingPrice:request.basePrice,
      })


    }catch(err){
      console.log("failed to request an auction" , err.message);
    }
  };

  const handleDeleteArt=(art)=>{
    console.log(`delete art request:${art.artname}`);
    // to do -->   delete art
  }

  const handleAddArt = async (artDetails) => {
  
    const formData = new FormData();
    formData.append("image", artDetails.image);
    formData.append("title", artDetails.title);
    formData.append("description", artDetails.description);
    formData.append("price", artDetails.basePrice || "");
    try {
      const response = await axios.post("http://localhost:3000/arts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { imageUrl } = response.data;

      // Add the new artwork to the artworks state
      const newArtwork = {
        id: arts.length+1,
        title: artDetails.title,
        description: artDetails.description,
        basePrice: artDetails.basePrice,
        imageUrl, // Use the image URL returned by the backend
      };
      console.log(newArtwork);

      setArts((prevArts) => [...prevArts, newArtwork]);
     // setShowPopup(false); // Close the popup
    } catch (error) {
      if(error.response){
        toast.error(error.response.data);
      }
      else
        toast.error("Internal server error sorry !");
      console.error("Error uploading art:", error.response?.data || error.message);
    }
  };

  async function handleAddArtToWishlist(art){
    console.log(art);
    try{
      const response = await axios.post("http://localhost:3000/client/addWishlist",{
        artId:art.artid
      });
      console.log(response.data);
      toast.success("Added to wishlist Successfully");
      setWishlist([...wishlist , art])
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
          
         
        }
        catch(err){
          console.log("Error in removing from wishlist");
          toast.error("Error Removing form Wishlist");
        }
      }

    
  return (
    <div className="portfolio">
      
      {viewonly ? <h1 className="portfolio-title">{artistname}'s profile</h1>:<h1 className="portfolio-title">My Portfolio</h1>}
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
            <ToastContainer/>
      <div className="portfolio-grid">
        {arts.map((art) => (
          console.log(art),
          <PortfolioCard
            key={art.artid}
            art={art}
            onClick={handleArtClick}
            onAuctionRequest={handleAuctionRequest}
            onDelete={handleDeleteArt}
            viewonly={viewonly}
          />
        ))}
        { viewonly === false && <button className='Add-art-button' onClick={()=>setAddArt(true)}>
          <span className='add-button-text'>Add New Art</span>
          <br/>
          <FontAwesomeIcon icon={faPalette}  style={{ fontSize: '1.5em', color: '#dfdf82' }} />
        </button>}
      </div>
      
      {selectedArt && <ArtPopUp post={selectedArt} onClose={() => setSelectedArt(null)} theArtist={!viewonly}  onSave={handleEditSave} addtowhishlist={handleAddArtToWishlist} removewishlist={handleRemovefromWishlsit} inWishlist={selectedArt.inWishlist}/>}
      {addArt && <AddArtPopup onClose = {() =>setAddArt(false)} onAdd={handleAddArt}/>}
     
      </>)}
        
    </div>
    
  );
};

export default Portfolio;
