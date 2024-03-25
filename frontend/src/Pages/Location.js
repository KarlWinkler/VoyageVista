import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import Button from '../Components/Button';
import Card from '../Components/Card';

import noImage from '../Assets/no-image.jpg';
import '../styles/location.scss';
import Tag from '../Components/Tag';

const Location = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      return fetch(`/location/${id}/`).then(res =>
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='location'>
      <div className='location-images'>
        <Images />
      </div>
      <p>{data.description}</p>
      <Card>
        <Tag name={'first'} />
      </Card>
      <Button tertiary text='Comment' to='/' />
    </div>
  );
};

export default Location;