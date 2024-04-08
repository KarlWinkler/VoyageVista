import React from 'react';

import '../styles/ratings.scss';

const Ratings = ({ ratings }) => {
  const Rating = ({ rating }) => {
    let stars = [];
    for(let i = 0; i < rating; i++) {
      stars.push(<span key={`star_${i}`}>⭐</span>)
    }
    return stars;
  }

  return (
    <div className='ratings'>
      {ratings?.map((rating, index) => {
        return (
          <div key={index} className='rating'>
            <h3>{rating?.tag.name}</h3>
            <div>
              <Rating rating={rating.rating} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;