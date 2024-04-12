import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import getCookie from './GetCookie';
import Button from './Button';
import RatingItem from './RatingItem';

const AddRatings = ({ location_id, ratings }) => {
  console.log('ratings', ratings)
  const queryClient = useQueryClient();
  const [selectedTag, setSelectedTag] = useState('');
  const [ratingList, setRatingList] = useState(ratings?.map(rating => ({
    tag: rating.tag,
    rating: 0
  })));

  useEffect(() => {
    setRatingList(ratings?.map(rating => ({
      tag: rating.tag,
      rating: 0
    })));
  }, [ratings]);

  const { data: allTags, isLoading } = useQuery('tagsList', async () => {
    const response = await fetch('/api/tag/?location_id=' + location_id);
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
      queryClient.invalidateQueries('tagsList');
      queryClient.invalidateQueries('location');
      
      return response.json();
    },
  });

  const submitRatings = () => {
    addRating.mutate();
  }

  const handleAddRating = () => {
    const newRatingList = [...ratingList];
    newRatingList.push({ tag: { id: parseInt(document.querySelector('.add-tag select').value), name: selectedTag}, rating: 0 });
    setRatingList([...newRatingList]);
  }

  const handleSelectTag = (e) => {
    const tag = allTags.find(tag => tag.id === parseInt(e.target.value))
    setSelectedTag(tag.name);
  }

  return (
    <div>
      <div id='ratings'>
        {ratingList?.map((rating, index) => (
            <RatingItem key={index} tag={rating.tag} ratingList={ratingList} setRatingList={setRatingList} />
        ))}
      </div>
      <div className='add-tag'>
        <select name={selectedTag} onInput={handleSelectTag} >
          <option value=''>Select a tag</option>
          {allTags?.map((tag, index) => {
            return (
              <option key={index} value={tag.id} name={tag.name}>{tag.name}</option>
            );
          })}
        </select>
        <Button text={'Add Rating'} onClick={handleAddRating} />
        <Button secondary text={'Submit Ratings'} onClick={submitRatings} />
      </div>
    </div>
  );
};

export default AddRatings;