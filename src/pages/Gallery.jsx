import React from 'react';
import Post from '../components/gallery/Post';
import '../css/Gallery.css';



const Gallery = () => {

    const posts = [
        {
          creator: {
            username: 'John Doe',
            profilePic: './src/assets/testImages/default-profile.jpg',
          },
          title: 'Beautiful Landscape',
          imageUrl: './src/assets/testImages/download.jpg',
        },
        {
          creator: {
            username: 'Jane Smith',
            profilePic: './src/assets/testImages/default-profile.jpg',
          },
          title: 'Sunset by the Beach',
          imageUrl: './src/assets/testImages/download (1).jpg',
        },
      ];
      
  return (
    <div className="gallery">
      {posts.map((post, index) => (
        <Post
          key={index}
          creator={post.creator}
          title={post.title}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default Gallery;
