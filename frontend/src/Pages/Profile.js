import React from 'react';
import { useQuery } from 'react-query';

import Card from '../Components/Card';
import AddButton from '../Components/AddButton';
import LocationCard from '../Components/LocationCard';
import Tag from '../Components/Tag';

import '../styles/profile.scss';

const Profile = ({ user }) => {
  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      return fetch(`/api/auth/users/tags/`).then(res =>
        res.json()
      );
    },
    staleTime: 10 * 1000 * 60,
    cacheTime: 10 * 1000 * 60
  });
  const { data: bucketList, isLoading: bucketListLoading } = useQuery({
    queryKey: ['bucketList'],
    queryFn: async () => {
      return fetch(`/api/auth/users/bucket_list/`).then(res =>
        res.json()
      );
    },
    staleTime: 10 * 1000 * 60,
    cacheTime: 10 * 1000 * 60
  });
  const { data: visited, isLoading: visitedLoading } = useQuery({
    queryKey: ['visited'],
    queryFn: async () => {
      return fetch(`/api/auth/users/visited/`).then(res =>
        res.json()
      );
    },
    staleTime: 10 * 1000 * 60,
    cacheTime: 10 * 1000 * 60
  });

  console.log(user)
  return (
    <div className='profile'>
      <div className="profile-name">
        <img className='profile-image' src={user?.images[0].image} alt={user?.username} />
        {user?.username}
      </div>
      <Card className="profile-tags">
        {tags?.map((tag, index) => {
          return (
            <Tag key={index} name={tag.name} />
          );
        })}
        <AddButton />
      </Card>
      <div className='profile-locations'>
        <h1>Visited</h1>
        <AddButton to='/explore'/>
        <div className='profile-locations-list'>
          {visited?.map(({ location }, index) => {
            console.log(location.images[0].image);
            return (
              <LocationCard key={`visited_${index}`} name={location.name} image={location.images[0].image} alt={location.images[0].alt} tags={location.tags} />
            );
          })}
        </div>
      </div>
      <div className='profile-locations'>
        <h1>Bucket List</h1>
        <AddButton to='/explore'/>
        <div className='profile-locations-list'>
          {bucketList?.map(({ location }, index) => {
            return (
              <LocationCard key={`bucket_${index}`} name={location.name} image={location.images[0].image} alt={location.images[0].alt} tags={location.tags} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;