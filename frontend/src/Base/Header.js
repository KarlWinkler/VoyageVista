import React from 'react'
import Hamburger from '../Components/Hamburger'

import logo from '../Assets/logo.png'
import '../styles/header.scss'

const Header = ({ title }) => {
  return (
    <div className='Header'>
      <img src={logo} alt='logo' className='logo' />
      <h2>{title}</h2>
      <Hamburger />
    </div>
  )
}

export default Header