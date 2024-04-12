import React from 'react';
import { useQuery } from 'react-query';

import Card from '../Components/Card';
import AddButton from '../Components/AddButton';
import LocationCard from '../Components/LocationCard';
import Tag from '../Components/Tag';
import AddTag from '../Components/AddTag';

import '../styles/profile.scss';

const Profile = ({ user }) => {
  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ['userTags'],
    queryFn: async () => {
      return fetch(`/api/auth/users/tags/`).then(res =>
        res.json()
      );
    },
  });
  const { data: bucketList, isLoading: bucketListLoading } = useQuery({
    queryKey: ['bucketList'],
    queryFn: async () => {
      return fetch(`/api/auth/users/bucket_list/`).then(res =>
        res.json()
      );
    },
  });
  const { data: visited, isLoading: visitedLoading } = useQuery({
    queryKey: ['visited'],
    queryFn: async () => {
      return fetch(`/api/auth/users/visited/`).then(res =>
        res.json()
      );
    },
  });

  return (
    <div className='profile'>
      <div className="profile-name">
        <img className='profile-image' src={user?.images[0]?.image || 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='} alt={'profile image'} />
        {user?.username}
      </div>
      <Card className="profile-tags">
        <div className='profile-tags'>

          {tags?.map((tag, index) => {
            return (
              <Tag key={index} name={tag.tag.name} />
            );
          })}
        </div>
        <AddTag />
      </Card>
      <div className='profile-locations'>
        <h1>Visited</h1>
        <AddButton to='/explore'/>
        <div className='profile-locations-list'>
          {visited?.map(({ location }, index) => {
            console.log(location.images[0]?.image);
            return (
              <LocationCard key={`visited_${index}`} location={location} />
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
              <LocationCard key={`bucket_${index}`} location={location} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;