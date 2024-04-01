import React from 'react';

import Button from './Button';

const AddButton = (params) => {
  return (
    <Button secondary text='+ Add' className='add-button' {...params}/>
  );
};

export default AddButton;