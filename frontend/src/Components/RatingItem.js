import React, { useState } from 'react';
import { ReactComponent as Star } from '../Assets/star.svg';
import { ReactComponent as StarEmpty } from '../Assets/empty_star.svg';

const RatingItem = ({ tag, ratingList, setRatingList }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const handleMouseOver = (e) => {
    setHover(parseInt(e.target.id));
  };
  const handleMouseLeave = () => {
    setHover(0);
  };
  const handleClick = (e) => {
    const rating = parseInt(e.target.closest('.star-pick').id);
    const index = ratingList.findIndex(rating => rating.tag.id === tag.id);
    const newRatingList = [...ratingList];
    newRatingList[index] = { tag: tag, rating: rating };
    setRating(rating);
    setRatingList([...newRatingList]);
  }

  return (
    <div className='add-tag'>
      <h3>{tag?.name}</h3>
      <div>
        {
          [1, 2, 3, 4, 5].map((id, index) => {
            return (
              <span key={index}>
                <StarEmpty id={id} className={`star-pick ${(hover >= id) ? 'empty' : '' } ${(rating >= id) ? 'picked' : '' }`} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick} />
              </span>
            );
          })
        }
      </div>
    </div>
  );
};

export default RatingItem;