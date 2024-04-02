import React from 'react';
import { useQuery } from 'react-query';

import { ReactComponent as AcceptIcon } from '../Assets/accept.svg';
import { ReactComponent as RejectIcon } from '../Assets/reject.svg';
import { ReactComponent as LeftIcon } from '../Assets/left.svg';
import { ReactComponent as RightIcon } from '../Assets/right.svg';

import Ratings from '../Components/Ratings';

import '../styles/discover.scss';

const ImageCarousel = ({ images }) => {
  return (
    <div className='image-carousel'>
      <LeftIcon className='discover-icon' />
      {images?.map((image, index) => {
        let img = image.image.replace('voyage-vista-backend', 'localhost')
        return (
          <img className='discover-image' key={index} src={img} alt='Discover' />
        );
      })}
      <RightIcon className='discover-icon' />
    </div>
  );
}

const Options = ({ location }) => {
  return (
    <div className='discover-options'>
      <RejectIcon className='discover-icon' />
      <h1>{location?.name}</h1>
      <AcceptIcon className='discover-icon' />
    </div>
  );
}

const Desctiption = ({ location }) => {
  return (
    <div className='discover-description'>
      <p>{location?.description}</p>
      <Ratings ratings={location?.ratings} />
    </div>
  );
}

const Discover = () => {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      return fetch(`/api/locations/discover/`).then(res =>
        res.json()
      );
    },
    staleTime: 5 * 1000 * 60,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(locations)
  return (
    <div className='discover'>
      {locations?.map((location, index) => {
        return (
          <div key={index}>
            <ImageCarousel images={location?.images} />
            <Options location={location} />
            <Desctiption location={location} />
          </div>
        );
      })}
    </div>
  );
};

export default Discover;
