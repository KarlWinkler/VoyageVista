import React from 'react';
import { useQuery } from 'react-query';
import '../styles/explore.scss';
import LocationCard from '../Components/LocationCard';


// Tag Component
const Tag = ({ name }) => {
  return <span className="tag">{name}</span>;
};

// Explore Component
const Explore = () => {
  const { data: locations, isLoading } = useQuery('locations', async () => {
    const response = await fetch('/api/location');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="explore">
      <div className="explore-grid">
        {locations.map((location, index) => (
          <LocationCard key={index} location={location} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
