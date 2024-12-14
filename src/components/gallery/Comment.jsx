import React from 'react';
import Stars from 'react-rating-stars-component';
import '../../css/Comment.css';

const Comment = ({ profilepic,name,rating, text }) => {
  return (
    <div className="comment">
        <div className='commenter'>
            <img className='commenter-pic' 
             src={profilepic}>
             </img>
             <p className='commenter-name'>{name}</p>
        </div>
      <Stars
        count={5}
        value={rating}
        size={20}
        isHalf={true}
        edit={false} // Non-editable stars
        activeColor="#ffd700"
      />
      <p>{text}</p>
    </div>
  );
};

export default Comment;
