import React from 'react';

import '../styles/tag.scss';

const Tag = ({ name }) => {
  return (
    <div className='tag'>
      {name}
    </div>
  );
};

export default Tag;