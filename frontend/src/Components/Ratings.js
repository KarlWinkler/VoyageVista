import React from 'react';

import '../styles/ratings.scss';

const Ratings = ({ ratings }) => {
  const Rating = ({ rating }) => {
    let stars = [];
    for(let i = 0; i < rating; i++) {
      stars.push(<span>⭐</span>)
    }
    return stars;
  }

  console.log(ratings);
  return (
    <div className='ratings'>
      {ratings?.map((rating, index) => {
        return (
          <div key={index} className='rating'>
            <h3>{rating?.tag.name}</h3>
            <Rating rating={rating.rating} />
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;