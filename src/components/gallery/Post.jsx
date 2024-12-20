import React from 'react';
import '../../css/Post.css';

const Post = ({post ,onClick }) => {
  return (
    <div className="post" onClick={onClick}>
      <div className="post-header">
        <img
          className="profile-pic"
          src={post.artistPic}
          alt={`${post.artistName}'s profile`}
        />
        <div className="creator-info">
          <p className="username">{post.artistName}</p>
          <p className="title">{post.artname}</p>
        </div>
      </div>
      <img className="post-image" src={post.photo} alt={post.artname} />
    </div>
  );
};

export default Post;
