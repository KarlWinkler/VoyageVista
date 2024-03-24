import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/button.scss';

const Button = ({ text, to, secondary, tertiary }) => {
  return (
    <Link className ={`button ${secondary ? 'secondary' : ''} ${tertiary ? 'tertiary' : ''}`} to={to}>
      {text}
    </Link>
  );
};

export default Button;