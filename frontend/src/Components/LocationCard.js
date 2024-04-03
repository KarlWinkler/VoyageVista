import React from 'react';

import Card from './Card';
import Tag from './Tag';

const LocationCard = ({ index, location }) => {
  let img = location?.images[0]?.image.replace('voyage-vista-backend', 'localhost')

  return (
    <Card key={index} className='location-card'>
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