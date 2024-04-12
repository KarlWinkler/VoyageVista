import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import getCookie from './GetCookie';
import Button from './Button';
import RatingItem from './RatingItem';

const AddRatings = ({ location_id, ratings }) => {
  const queryClient = useQueryClient();
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

  const addRating = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/location/${location_id}/add_rating/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(ratingList.map(rating => ({
          tag: rating.tag.id,
          rating: rating.rating
        }))),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      queryClient.invalidateQueries('location');
      return response.json();
    },
  });

  const submitRatings = () => {
    addRating.mutate();
  }

  console.log(ratings)
  return (
    <div>
      <div>
        {ratings?.map((rating, index) => (
            <RatingItem key={index} tag={rating.tag} ratingList={ratingList} setRatingList={setRatingList} />
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
        <Button secondary text={'Submit Ratings'} onClick={submitRatings} />
      </div>
    </div>
  );
};

export default AddRatings;