import React, { useState } from 'react';
import { ReactComponent as RightIcon } from '../Assets/right.svg';

import getCookie from './GetCookie';
import Button from './Button';
import '../styles/hamburger.scss';

const Hamburger = ({ user }) => {
  const [open, setOpen] = useState(false);
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
    <div className='hamburger' onClick={() => setOpen(!open)} >
      <div className='line'></div>
      <div className='line'></div>
      <div className='line'></div>
      <div className={`hamburger-menu ${open ? '' : 'hidden'}`}>
        {user ? (
          <>
            <RightIcon className='close-icon' />
            <Button to={'/'} className='menu-item' text='Home' />
            <Button to={'/profile'} className='menu-item' secondary text='Profile' />
            <Button className='menu-item' tertiary text='Logout' onClick={() => handleLogout()} />
          </>
        ) : (
          <>
            <RightIcon className='close-icon' />
            <Button to={'/'} className='menu-item' text='Home' />
            <Button to={'/login'} className='menu-item' secondary text='Login' />
            <Button to={'/signup'} className='menu-item' tertiary text='Signup' />
          </>
        )}
      </div>
    </div>
  );
};

export default Hamburger;