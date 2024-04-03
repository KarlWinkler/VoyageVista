import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Card from '../Components/Card';
import Box from '../Components/Box';
import Comment from '../Components/Comment'

import noImage from '../Assets/no-image.jpg';
import '../styles/location.scss';
import Tag from '../Components/Tag';

const Location = ({ user }) => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      return fetch(`/api/location/${id}/`).then(res =>
        res.json()
      );
    },
    staleTime: 5 * 1000 * 60,
  });

  console.log("location", data);

  const Images = () => {
    if (data.images.length > 0) {
      return data.images.map((image, index) => {
        let img = image.image.replace('voyage-vista-backend', 'localhost')
        return (
          <img key={index} src={img} alt={image.alt} />
        );
      });
    } else {
      return (
        <img src={noImage} alt='placeholder' />
      );
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box className='location'>
      <div className='location-details'>
        <div className='location-images'>
          <Images />
        </div>
        <div className='location-description'>
          <p>{data.description}</p>
        </div>
        <Card className='location-tags'>
          <Tag name={'first'} />
        </Card>
      </div>
      <Comment location_id={data.id} user={user} />
    </Box>
  );
};

export default Location;