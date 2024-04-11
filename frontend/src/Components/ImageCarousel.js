import React, { useState } from 'react';

import { ReactComponent as LeftIcon } from '../Assets/left.svg';
import { ReactComponent as RightIcon } from '../Assets/right.svg';

const ImageCarousel = ({ images, imageIndex, setImageIndex }) => {
  const progressImage = (forward, imageIndex, setImageIndex, images) => {
    if (!images) {
      return;
    }
  
    if (forward && imageIndex + 1 === images.length) {
      setImageIndex(0);
      return;
    }
    if (!forward && imageIndex === 0) {
      setImageIndex(images.length - 1);
      return;
    }
  
    if (forward) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  }

  const Image = ({ image }) => {
    let img = image?.image.replace('voyage-vista-backend', 'localhost')
    return (
      <img className='discover-image' src={img} alt='Discover' />
    );
  }

  if (!images) {
    return null;
  }
  return (
    <div className='image-carousel'>
      <div className='discover-bg' style={{backgroundImage: `url(${images[imageIndex]?.image.replace('voyage-vista-backend', 'localhost')})`}} ></div>
      <LeftIcon className='discover-icon' onClick={() => progressImage(false, imageIndex, setImageIndex, images)}/>
      <Image image={images[imageIndex]} />
      <RightIcon className='discover-icon' onClick={() => progressImage(true, imageIndex, setImageIndex, images)} />
    </div>
  );
};

export default ImageCarousel;