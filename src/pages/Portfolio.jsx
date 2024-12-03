import React, { useState } from 'react';
import PortfolioCard from '../components/Portfolio/PortofolioCard.jsx';
import ArtPopUp from '../components/gallery/ArtPopUp';

import '../css/Portfolio.css';

const Portfolio = () => {
  const [selectedArt, setSelectedArt] = useState(null);

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
    console.log(`Request auction for: ${art.title}`);
    // Add auction request logic here
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
          />
        ))}
      </div>
      {selectedArt && <ArtPopUp post={selectedArt} onClose={() => setSelectedArt(null)} TheArtist={true}  onSave={handleEditSave}/>}
      
        
    </div>
  );
};

export default Portfolio;
