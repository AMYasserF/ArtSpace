import React from 'react';
import Stars from 'react-rating-stars-component';
import '../../css/Comment.css';

const Comment = ({ user,rating, text }) => {
  return (
    <div className="comment">
        <div className='commenter'>
            <img className='commenter-pic' 
             src={user.profilepic}>
             </img>
             <p className='commenter-name'>{user.name}</p>
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
