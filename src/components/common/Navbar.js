import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../logo.png'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
  <div className="container-fluid">
  <NavLink className="navbar-brand py-1" to="/">
      <img src={logo} alt="" width="30" height="24" />
    </NavLink>
    <NavLink className="navbar-brand text-white" to="/">Movies-Rating</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link text-white" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/Favourites">Favourites</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>


  )
}

export default Navbar