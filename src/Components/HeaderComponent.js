import React from 'react'
import { Link } from 'react-router-dom'
import "./HeaderComponent.css"

const HeaderComponent = () => {
  return (
    <div className="Header fixed-top">
      <header>
        <h2 className='d-inline'>MOVIES  INFO</h2>&nbsp;<small>Discover Films Easily....</small>
      </header>
      <div className='homeIcon'>
        <a href='/'><i className='bi bi-house-fill'></i></a>
      </div>
    </div>
  )
}

export default HeaderComponent
