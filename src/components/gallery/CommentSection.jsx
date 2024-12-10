import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import Comment from './Comment';
import '../../css/CommentSection.css';

const CommentSection = ({ comments }) => {
  console.log(comments);
  return (
    <div className="comment-section">
      <ScrollableFeed>
        {comments.map((comment, index) => (
          <Comment key={index} user= {comment.user} rating={comment.rating} text={comment.text} />
        ))}
      </ScrollableFeed>
    </div>
  );
};

export default CommentSection;
