import React from 'react'
import Hamburger from '../Components/Hamburger'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import logo from '../Assets/logo.png'
import '../styles/header.scss'

const Header = () => {
  const location = useLocation()
  const { id } = useParams()

  const locationSearchParam = location.pathname.includes('location') ? `location_id=${id}` : ''

  const { data, isLoading } = useQuery('header', async () => {
    return fetch(`/auth/header?${locationSearchParam}`).then(res =>
      res.json()
    )
  })

  const title = () =>  {
    if ((location.pathname).includes('location')) {
      console.log(data)
      return data?.location.name || 'Explore'
    } else {
      return 'Home'
    }
  }

  return (
    <div className='Header'>
      <img src={logo} alt='logo' className='logo' />
      <h2>{title()}</h2>
      <Hamburger />
    </div>
  )
}

export default Header