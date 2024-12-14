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
          <Comment key={index} profilepic= {comment.clientprofilepic} name = {comment.clientname} rating={comment.rate} text={comment.comments} />
        ))}
      </ScrollableFeed>
    </div>
  );
};

export default CommentSection;
