import React from 'react';
import logo from '../assets/images/logo.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  async function handleLogout(){
    try{
    await axios.post("http://localhost:3000/register/logout");
    }
    catch(err){
      console.log(err);
    }
    }
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img 
            src={logo}
            alt="ArtSpace Logo" 
            className="logo-img"
          />
          <span className="logo-text">ArtSpace</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
          <NavLink to="/auctions" className="nav-link">Auctions</NavLink>
          <NavLink to="/artists" className="nav-link">Artists</NavLink>
          <NavLink to="/Exhibitions" className="nav-link">Exhibitions</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          {props.Role == null && <NavLink to="/Login" className="nav-link">Login/SignUp</NavLink>}
          {props.Role==='Admin'?<NavLink to="/admin" className="nav-link">Admin</NavLink>:null}

          {/*change the not equal later  */}
          {props.Role==='Artist'?<NavLink to="/portfolio" className="nav-link">portfolio</NavLink>:null}  



          {props.Logged==='true'?<button className="nav-link" onClick={handleLogout}>Logout</button>:null}

        </nav>

      
        {/* Mobile Menu Toggle */}
        <div className="mobile-menu">
          <button className="mobile-menu-btn">
            <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
