import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/button.scss';

const Button = ({ text, to, onClick, className, secondary, tertiary, minor }) => {
  return (
    <Link
      className={`button ${secondary ? 'secondary' : ''} ${tertiary ? 'tertiary' : ''} ${minor ? 'minor' : ''} ${className || ''}`}
      onClick={onClick}
      to={to}
    >
      <p>{text}</p>
    </Link>
  );
};

export default Button;