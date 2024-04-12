import React from 'react';

import { ReactComponent as Star } from '../Assets/star.svg';
import { ReactComponent as StarEmpty } from '../Assets/empty_star.svg';
import '../styles/ratings.scss';

const Ratings = ({ ratings }) => {
  const Rating = ({ rating }) => {
    let stars = [];
    for(let i = 0; i < rating; i++) {
      stars.push(<span key={`star_${i}`}>
        <Star className={'star'} />
      </span>)
    }
    for(let i = rating; i < 5; i++) {
      stars.push(<span key={`empty_star_${i}`}>
        <StarEmpty className={'star'} />
      </span>)
    }
    return stars;
  }

  const parsedRatings = JSON.parse(ratings)
  console.log(parsedRatings)
  return (
    <div className='ratings'>
      {parsedRatings?.map((rating, index) => {
        return (
          <div key={index} className='rating' title={rating?.average}>
            <h3>{rating?.tag.name}</h3>
            <div>
              <Rating rating={Math.floor(rating.average)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;