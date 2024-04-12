import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import Card from '../Components/Card';
import Box from '../Components/Box';
import Comment from '../Components/Comment'
import Button from '../Components/Button';
import getCookie from '../Components/GetCookie';

import '../styles/location.scss';
import Tag from '../Components/Tag';
import ImageCarousel from '../Components/ImageCarousel';
import Ratings from '../Components/Ratings';
import AddRatings from '../Components/AddRatings';

const Location = ({ user, setLocation }) => {
  const queryClient = useQueryClient();
  const [imageIndex, setImageIndex] = useState(0);
  const [bucketList, setBucketList] = useState(false);
  const [visited, setVisited] = useState(false);
  
  const { id } = useParams();

  const { data, isLoading: locationLoading } = useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      console.log(`fetching location`, id)
      return fetch(`/api/location/${id}/`).then(res =>
        res.json()
      );
    },
  });

  useEffect(() => {
    setBucketList(data?.bucket_list);
    setVisited(data?.visited);
  }, [data]);

  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      return fetch(`/api/location/${id}/tags/`).then(res =>
        res.json()
      );
    },
  });

  const addBucketList = useMutation({
    mutationFn: async () => {
      return fetch(`/api/auth/users/add_bucket_list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          location_id: id,
        }),
      }).then(res =>
        res.json()
      );
    },
  });

  const removeBucketList = useMutation({
    mutationFn: async () => {
      return fetch(`/api/auth/users/remove_bucket_list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          location_id: id,
        }),
      }).then(res =>
        res.json()
      );
    },
  });

  const handleClickRemoveBucketList = (e) => {
    e.preventDefault();
    removeBucketList.mutate();
    queryClient.invalidateQueries('location');
    setBucketList(false);
  }

  const handleClickBucketList = (e) => {
    e.preventDefault();
    addBucketList.mutate();
    queryClient.invalidateQueries('location');
    setBucketList(true);
  }

  const addVisited = useMutation({
    mutationFn: async () => {
      return fetch(`/api/auth/users/add_visited/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          location_id: id,
        }),
      }).then(res =>
        res.json()
      );
    },
  });

  const removeVisited = useMutation({
    mutationFn: async () => {
      return fetch(`/api/auth/users/remove_visited/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          location_id: id,
        }),
      }).then(res =>
        res.json()
      );
    },
  });

  const handleClickRemoveVisited = (e) => {
    e.preventDefault();
    removeVisited.mutate();
    queryClient.invalidateQueries('location');
    setVisited(false);
  }

  const handleClickVisited = (e) => {
    e.preventDefault();
    addVisited.mutate();
    queryClient.invalidateQueries('location');
    setVisited(true);
  }

  setLocation(data);
  if (locationLoading) {
    return <h1>Loading...</h1>;
  }
  const ratings = JSON.parse(data?.ratings);
  return (
    <Box className='location'>
      <div className='location-details'>
        <div className='location-images'>
          <ImageCarousel images={data?.images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
        </div>
        <div className='location-description'>
          {user && (
            <div className='location-links'>
              {
                bucketList ? (
                  <Button text='- Remove from bucket list' onClick={e => handleClickRemoveBucketList(e)} />
                ) : (
                  <Button text='+ Add to bucket list' secondary onClick={e => handleClickBucketList(e)} />
                )
              }
              {
                visited ? (
                  <Button text='- Remove from visited' onClick={e => handleClickRemoveVisited(e)} />
                ) : (
                  <Button text='+ Add to visited' secondary onClick={e => handleClickVisited(e)} />
                )
              }
            </div>
          )}
          <p>{data?.description}</p>
        </div>
        <Card className='location-tags'>
          {tags?.map((tag, index) => {
            return (
              <Tag key={index} name={tag.name} />
            );
          })}
        </Card>
        <Ratings ratings={data.ratings} />
        {user && <AddRatings location_id={data?.id} user={user} ratings={ratings} /> }
      </div>
      <Comment location_id={data?.id} user={user} />
    </Box>
  );
};

export default Location;