import React from 'react';
import '../../css/Post.css';

const Post = ({ creator, title, imageUrl }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img
          className="profile-pic"
          src={creator.profilePic}
          alt={`${creator.username}'s profile`}
        />
        <div className="creator-info">
          <p className="username">{creator.username}</p>
          <p className="title">{title}</p>
        </div>
      </div>
      <img className="post-image" src={imageUrl} alt={title} />
    </div>
  );
};

export default Post;
