import React from 'react';
import { useQuery } from 'react-query';
import '../styles/explore.scss';
import logo from '../Assets/logo.png'


// Tag Component
const Tag = ({ name }) => {
  return <span className="tag">{name}</span>;
};

// Location Card Component
const LocationCard = ({ location }) => {
  return (
    <div className="location-card" onClick={() => {/* Navigate to location's page */}}>
      <img src={location.image} alt={location.name} className="location-image" />
      <div className="location-info">
        <h2>{location.name}</h2>
        <div className="tags">
          {location.tags.map((tag, index) => (
            <Tag key={index} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Explore Component
const Explore = () => {
  const { data: locations, isLoading } = useQuery('locations', async () => {
    const response = await fetch('/api/locations');
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
