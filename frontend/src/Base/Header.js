import React from 'react'
import Hamburger from '../Components/Hamburger'
import ExpandedMenu from '../Components/ExpandedMenu'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import logo from '../Assets/logo.png'
import '../styles/header.scss'

const Header = ({ user, name, location, setLocation }) => {
  if (!location) {
    setLocation('')
  }

  return (
    <div className='Header'>
        <img src={logo} alt='logo' className='logo' />
        {
          <h1>{name}</h1>
        }
      <ExpandedMenu user={user} />
      <Hamburger />
    </div>
  )
}

export default Header