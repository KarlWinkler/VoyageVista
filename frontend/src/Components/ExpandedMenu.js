import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from './GetCookie';

import { ReactComponent as HomeIcon} from '../Assets/home.svg';
import { ReactComponent as ProfileIcon} from '../Assets/profile.svg';

import '../styles/menu.scss';

const ExpandedMenu = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await fetch('/api/auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      credentials: 'include',
    });

    window.location.href = '/';
  };

  return (
    <>
      {user ? (
        <div className="menu">
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link className={'profile-user'} to="/profile">
          <ProfileIcon />
          <p>{user.username}</p>
        </Link>
        <Link onClick={() => handleLogout()}>
          Logout
        </Link>
      </div>
      ) : (
        <div className="menu">
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default ExpandedMenu;