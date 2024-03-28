import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Button from '../Components/Button';
import Card from '../Components/Card';
import Box from '../Components/Box';

import noImage from '../Assets/no-image.jpg';
import '../styles/location.scss';
import Tag from '../Components/Tag';

const Location = () => {
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

  console.log(data);

  const Images = () => {
    if (data.images.length > 0) {
      return data.images.map((image, index) => {
        return (
          <img key={index} src={image.image} alt={image.alt} />
        );
      });
    } else {
      return (
        <img src={noImage} alt='placeholder' />
      );
    }
  }

  const Comments = () => {
    if (data.comments.length > 0) {
      return data.comments.map((comment, index) => {
        return (
          <Box key={index} className='comment'>
            <p>{comment.user}</p>
            <p>{comment.content}</p>
          </Box>
        );
      });
    } else {
      return (
        <p>Be the first to comment!</p>
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
      <Box>
        <Button tertiary text='Comment' />
        <Comments />
      </Box>
    </Box>
  );
};

export default Location;