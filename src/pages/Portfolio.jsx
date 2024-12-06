import React, { useState } from 'react';
import PortfolioCard from '../components/Portfolio/PortofolioCard.jsx';
import ArtPopUp from '../components/gallery/ArtPopUp';
import AddArtPopup from '../components/Portfolio/AddArtPopup.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

import '../css/Portfolio.css';

const Portfolio = () => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [addArt , setAddArt] = useState(false);
  const [requestAuction , setRequestAuction] = useState(false);

  const [arts, setArts] = useState([
    {
      id: 1,
      title: 'Mystic Forest',
      imageUrl: './src/assets/testImages/download.jpg',
      description: 'An enchanting painting of a mysterious forest.',
      basePrice: '$300',
      creator: {
        username: 'ArtistName',
        profilePic: './src/assets/testImages/default-profile.jpg',
      },
      comments: [
        {
        user:{ 
            name:"ali",
            profilepic:'./src/assets/testImages/default-profile.jpg'
          } ,
            rating: 5, 
            text: 'Amazing work!' },
        { 
          user:{ 
            name:"ali",
            profilepic:'./src/assets/testImages/default-profile.jpg'
          } ,
          rating: 4, text: 'Really beautiful!' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 5, text: 'Amazing work!' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 2, text: 'over-priced' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 5, text: 'Amazing work!' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 2, text: 'over-priced' }
      ],
    },
    {
      id: 2,
      title: 'Ocean Bliss',
      imageUrl: './src/assets/testImages/download (1).jpg',
      description: 'A serene view of the ocean.',
      basePrice: '$250',
      creator: {
        username: 'ArtistName',
        profilePic: './src/assets/testImages/default-profile.jpg',
      },
      comments: [{
        user:{ 
            name:"ali",
            profilepic:'./src/assets/testImages/default-profile.jpg'
          } ,
            rating: 5, 
            text: 'Amazing work!' },
        { 
          user:{ 
            name:"ali",
            profilepic:'./src/assets/testImages/default-profile.jpg'
          } ,
          rating: 4, text: 'Really beautiful!' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 5, text: 'Amazing work!' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 2, text: 'over-priced' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 5, text: 'Amazing work!' },
        { user:{ 
          name:"ali",
          profilepic:'./src/assets/testImages/default-profile.jpg'
        } ,
        rating: 2, text: 'over-priced' },
      ],
    },
    // Add more arts here...
  ]);

  const handleEditSave = (updatedArt) => {
    setArts((prevArts) =>
      prevArts.map((art) => (art.id === updatedArt.id ? updatedArt : art))
    );
  };

  const handleArtClick = (art) => {
    setSelectedArt(art);
  };

  const handleAuctionRequest = (art) => {
    setRequestAuction(true);
    
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
    formData.append("basePrice", artDetails.basePrice || "");
   
    

    try {
      
      const response = await axios.post("http://localhost:3000/upload", formData, {
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
      console.error("Error uploading art:", error.response?.data || error.message);
    }
  };



  return (
    <div className="portfolio">
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {arts.map((art) => (
          <PortfolioCard
            key={art.id}
            art={art}
            onClick={handleArtClick}
            onAuctionRequest={handleAuctionRequest}
            onDelete={handleDeleteArt}
          />
        ))}
        <button className='Add-art-button' onClick={()=>setAddArt(true)}>
          <span className='add-button-text'>Add New Art</span>
          <br/>
          <FontAwesomeIcon icon={faPalette}  style={{ fontSize: '1.5em', color: '#dfdf82' }} />
        </button>
      </div>
      {selectedArt && <ArtPopUp post={selectedArt} onClose={() => setSelectedArt(null)} TheArtist={true}  onSave={handleEditSave}/>}
      {addArt && <AddArtPopup onClose = {() =>setAddArt(false)} onAdd={handleAddArt}/>}
      
        
    </div>
  );
};

export default Portfolio;
