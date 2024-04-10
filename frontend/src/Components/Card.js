import React from 'react';

import '../styles/card.scss';

const Card = ({ children, className, onClick }) => {
  return (
    <div className={`card ${className || ''}`} onClick={onClick} >
      {children}
    </div>
  );
};

export default Card;