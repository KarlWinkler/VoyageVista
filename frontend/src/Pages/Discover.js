import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ReactComponent as AcceptIcon } from '../Assets/accept.svg';
import { ReactComponent as RejectIcon } from '../Assets/reject.svg';
import ImageCarousel from '../Components/ImageCarousel';

import Ratings from '../Components/Ratings';

import '../styles/discover.scss';

const Desctiption = ({ location }) => {
  return (
    <div className='discover-description'>
      <p>{location?.description}</p>
      <Ratings ratings={location?.ratings} />
    </div>
  );
}

const Discover = () => {
  const navigate = useNavigate();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationIndex, setLocationIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { data: locations, isLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      return fetch(`/api/location/discover/`).then(res =>
        res.json()
      );
    },
    staleTime: 5 * 1000 * 60,
  });

  const progressLocation = (selected) => {
    let selectedLocationsTemp = [...selectedLocations];

    if (selected) {
      selectedLocationsTemp.push(locations[locationIndex].id);
      setSelectedLocations(selectedLocationsTemp);
    }

    if (locationIndex + 1 === locations.length) {
      navigate(`/explore?discover=${[...selectedLocationsTemp].join('%2C')}`);
    } else {
      setImageIndex(0);
      setLocationIndex(locationIndex + 1);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  let location = locations[locationIndex];
  return (
    <div className='discover'>
      <div className='discover-current-location'>
        <div>
          <ImageCarousel images={location?.images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
          <div className='discover-options'>
            <RejectIcon className='discover-icon' onClick={() => progressLocation(false)}/>
            <h1>{location?.name}</h1>
            <AcceptIcon className='discover-icon' onClick={() => progressLocation(true)} />
          </div>
          <Desctiption location={location} />
        </div>
      </div>
    </div>
  );
};

export default Discover;
