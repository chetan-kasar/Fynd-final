import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({profile}) => {
  const deleteSession = ()=>{
    localStorage.removeItem("profile");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
    <div className="container-fluid">
      <Link className="navbar-brand" href="#">Journi Journal</Link>
      <img className="logo" src={require("../Icons/logo.png")}/>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item">
            <Link to="/home" className="nav-link mx-2" aria-current="page">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to={"/public-cards"}>Public</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" onClick={deleteSession} to={"/"}>Logout</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><Link><img className='profile-img' src={require("../Icons/profile.png")}/>{profile}</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </nav>
  )
}

export default Navbar
