import React from 'react'
import Hamburger from '../Components/Hamburger'
import ExpandedMenu from '../Components/ExpandedMenu'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import logo from '../Assets/logo.png'
import '../styles/header.scss'

const Header = ({ name }) => {
  const location = useLocation()
  const { id } = useParams()

  const locationSearchParam = location.pathname.includes('location') ? `location_id=${id}` : ''

  const { data, isLoading } = useQuery({
    queryKey: 'header',
    queryFn: async () => {
      return fetch(`/api/auth/header/?${locationSearchParam}`).then(res =>
        res.json()
      )
    },
    staleTime: 5 * 1000 * 60,
  });

  const title = () =>  {
    if ((location.pathname).includes('location')) {
      return data?.location.name || 'Explore'
    } else {
      return name || 'Home'
    }
  }

  return (
    <div className='Header'>
        <img src={logo} alt='logo' className='logo' />
        {
          isLoading ?
            <h1></h1>
          :
            <h1>{title()}</h1>
        }
      <ExpandedMenu />
      <Hamburger />
    </div>
  )
}

export default Header