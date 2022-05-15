import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className="footer bg-dark shadow">
      <div className="container">
        <ul className="nav col-12  justify-content-center">
      <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-muted">Movies</NavLink></li>
      <li className="nav-item"><NavLink to="/Favourites" className="nav-link px-2 text-muted">Favourites</NavLink></li>
    </ul>
    <hr className='text-white' />
        <p className="text-center text-danger">&copy; 2022 Company, Inc</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer