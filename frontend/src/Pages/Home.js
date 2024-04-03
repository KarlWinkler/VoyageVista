import React from 'react'
import Button from '../Components/Button'

import '../styles/home.scss'

const Home = () => {
  return (
    <div className='home'>
      <div>
        <Button text='Explore' />
        <img src='https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='placeholder' />
      </div>
      <div>
        <Button text='Discover' secondary />
        <img src='https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='placeholder' />
      </div>
      <div>
        <Button text='Profile' tertiary />
        <img src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='placeholder' />
      </div>
    </div>
  )
}

export default Home