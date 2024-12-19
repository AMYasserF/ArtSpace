import React, { useEffect, useState } from 'react';
import PortfolioCard from '../components/Portfolio/PortofolioCard.jsx';
import ArtPopUp from '../components/gallery/ArtPopUp';
import AddArtPopup from '../components/Portfolio/AddArtPopup.jsx';
import RequestAuction from '../components/Portfolio/RequestAuctionPopup.jsx';
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
  const [requestAuction , setRequestAuction] = useState(false);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { artistname } = useParams(); 

  useEffect(() => {
    
    const fetchArts = async () => {

      const requiredName = viewonly ? artistname : thename;
    
      
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:3000/client/arts" ,  {
          artistname : requiredName
        });
        // const response = await axios.get("http://localhost:3000/artist/arts");
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
 
  const handleEditSave = (updatedArt) => {
    setArts((prevArts) =>
      prevArts.map((art) => (art.id === updatedArt.id ? updatedArt : art))
    );
  };
  
  const handleArtClick = (art) => {
    setSelectedArt(art);
  };

  const handleAuctionRequest = (art , request) => {
   
    console.log(art);
    console.log(request);

    //  ---> todo backend
  };

  const handleDeleteArt=(art)=>{
    console.log(`delete art request:${art.title}`);
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

  function handleAddArtToWishlist(art){
    try{
      const response = axios.post("http://localhost:3000/client/addWishlist",{
        artId:art.id
      });
      console.log(response.data);
      toast.success("Added to wishlist Successfully");
    }
      catch(err)
      {
        console.log("Error in adding to wishlist");
        toast.error("Could not be added to wishlist");
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
      {console.log(viewonly)}
      {selectedArt && <ArtPopUp post={selectedArt} onClose={() => setSelectedArt(null)} theArtist={!viewonly}  onSave={handleEditSave} addtowhishlist={handleAddArtToWishlist}/>}
      {addArt && <AddArtPopup onClose = {() =>setAddArt(false)} onAdd={handleAddArt}/>}
     
      </>)}
        
    </div>
    
  );
};

export default Portfolio;
