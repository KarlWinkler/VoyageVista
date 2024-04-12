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
        <div className='location-card__ratings'>
          {location?.tags?.slice(0, 3)?.map((tag, index) => {
            return (
              <Tag key={index} name={tag.tag.name} />
            );
          })}
        </div>
      </Card>
  );
};

export default LocationCard;