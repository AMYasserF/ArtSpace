import React from 'react';
import '../../css/Post.css';

const Post = ({post ,onClick }) => {
  return (
    <div className="post" onClick={onClick}>
      <div className="post-header">
        <img
          className="profile-pic"
          src={post.profilePic}
          alt={`${post.artistName}'s profile`}
        />
        <div className="creator-info">
          <p className="username">{post.artistName}</p>
          <p className="title">{post.title}</p>
        </div>
      </div>
      <img className="post-image" src={post.imageUrl} alt={post.title} />
    </div>
  );
};

export default Post;
