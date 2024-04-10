import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card';
import Tag from './Tag';

const LocationCard = ({ index, location }) => {
  const navigate = useNavigate();
  let img = location?.images[0]?.image.replace('voyage-vista-backend', 'localhost')

  const handleLocationClick = () => {
    navigate(`/location/${location.id}`);
  }

  return (
      <Card key={index} className='location-card' onClick={handleLocationClick} >
        <img src={img} alt={location?.images[0]?.alt} />
        {location?.name}
        {location?.tags?.map((tag, index) => {
          return (
            <Tag key={index} name={tag.tag.name} />
          );
        })}
      </Card>
  );
};

export default LocationCard;