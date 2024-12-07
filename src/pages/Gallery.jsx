import React from 'react';
import Post from '../components/gallery/Post';
import Popup from '../components/gallery/ArtPopUp';
import '../css/Gallery.css';
import { useState } from 'react';



const Gallery = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [arts, setArts] = useState([]);
  useEffect(() => {
    const fetchArts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/artist/arts");
        setArts(response.data);
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
    const posts = [
      {
        id: 1,
        creator: {
          username: 'John Doe',
          profilePic: './src/assets/testImages/default-profile.jpg',
        },
        title: 'Beautiful Landscape',
        imageUrl: './src/assets/testImages/download.jpg',
        description: 'A stunning landscape capturing nature’s beauty.',
        basePrice: '$200',
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
          rating: 2, text: 'over-priced' },
        ],
      },
      {
        id: 2,
        creator: {
          username: 'paul shawn',
          profilePic: './src/assets/testImages/default-profile.jpg',
        },
        title: 'Beautiful Landscape',
        imageUrl: './src/assets/testImages/download (1).jpg',
        description: 'A piece of art',
        basePrice: '$150',
        comments: [
          { rating: 3, text: 'nice try' },
          { rating: 1, text: 'bad' },
        ],
      },
      {
        id: 3,
        creator: {
          username: 'John snow',
          profilePic: './src/assets/testImages/default-profile.jpg',
        },
        title: 'Beautiful Landscape',
        imageUrl: './src/assets/testImages/images.jpg',
        description: 'A stunning landscape capturing nature’s beauty.',
        basePrice: '$150',
        comments: [
          { rating: 5, text: 'Amazing work!' },
          { rating: 2, text: 'over-priced' },
        ],
      },
      
      ];
      
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
