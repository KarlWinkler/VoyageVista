import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Card from '../Components/Card';
import Box from '../Components/Box';
import Comment from '../Components/Comment'
import Button from '../Components/Button';

import '../styles/location.scss';
import Tag from '../Components/Tag';
import ImageCarousel from '../Components/ImageCarousel';

const Location = ({ user, setLocation }) => {
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
          <Button text='Add to bucket list'  />
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