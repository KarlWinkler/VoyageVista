import React from 'react';

import Card from './Card';
import Tag from './Tag';

const LocationCard = ({ index, name, image, alt, tags }) => {
  return (
    <Card key={index} className='location-card'>
      <img src={`http://localhost:8000${image}/`} alt={alt} />
      {name}
      {tags?.map((tag, index) => {
        return (
          <Tag key={index} name={tag.tag.name} />
        );
      })}
    </Card>
  );
};

export default LocationCard;