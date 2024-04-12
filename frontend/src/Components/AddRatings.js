import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Button from './Button';
import RatingItem from './RatingItem';

const AddRatings = ({ ratings }) => {
  const [ratingList, setRatingList] = useState(ratings?.map(rating => ({
    tag: rating.tag,
    rating: rating.rating
  })));
  const { data: allTags, isLoading } = useQuery('tagsList', async () => {
    const response = await fetch('/api/tag');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  console.log(ratings)
  return (
    <div>
      <div>
        {ratings?.map((rating, index) => (
            <RatingItem tag={rating.tag} ratingList={ratingList} setRatingList={setRatingList} />
        ))}
      </div>
      <div className='add-tag'>
        <select>
          <option value=''>Select a tag</option>
          {allTags?.map((tag, index) => {
            return (
              <option key={index} value={tag.name}>{tag.name}</option>
            );
          })}
        </select>
        <Button  text={'Add Rating'} />
      </div>
    </div>
  );
};

export default AddRatings;