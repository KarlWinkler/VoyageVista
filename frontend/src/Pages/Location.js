import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import Card from '../Components/Card';
import Box from '../Components/Box';
import Comment from '../Components/Comment'
import Button from '../Components/Button';
import getCookie from '../Components/GetCookie';

import '../styles/location.scss';
import Tag from '../Components/Tag';
import ImageCarousel from '../Components/ImageCarousel';

const Location = ({ user, setLocation }) => {
  const queryClient = useQueryClient();
  const [imageIndex, setImageIndex] = useState(0);
  
  const { id } = useParams();

  const { data, isLoading: locationLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      console.log(`fetching location`, id)
      return fetch(`/api/location/${id}/`).then(res =>
        res.json()
      );
    },
  });

  const addBucketList = useMutation({
    mutationFn: async () => {
      return fetch(`/api/auth/users/add_bucket_list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          location_id: id,
        }),
      }).then(res =>
        res.json()
      );
    },
  });

  const removeBucketList = useMutation({
    mutationFn: async () => {
      return fetch(`/api/auth/users/remove_bucket_list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          location_id: id,
        }),
      }).then(res =>
        res.json()
      );
    },
  });

  const handleClickRemoveBucketList = (e) => {
    e.preventDefault();
    removeBucketList.mutate();
    queryClient.invalidateQueries('location');
  }

  const handleClickBucketList = (e) => {
    e.preventDefault();
    addBucketList.mutate();
    queryClient.invalidateQueries('location');
  }

  setLocation(data);
  if (locationLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box className='location'>
      <div className='location-details'>
        <div className='location-images'>
          <ImageCarousel images={data?.images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
        </div>
        <div className='location-description'>
          {
            data?.bucket_list ? (
              <Button text='- Remove from bucket list' onClick={e => handleClickRemoveBucketList(e)} />
            ) : (
              <Button text='+ Add to bucket list' onClick={e => handleClickBucketList(e)} />
            )
          }
          <p>{data?.description}</p>
        </div>
        <Card className='location-tags'>
          <Tag name={'first'} />
        </Card>
      </div>
      <Comment location_id={data?.id} user={user} />
    </Box>
  );
};

export default Location;