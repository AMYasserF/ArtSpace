import React from 'react';
import logo from '../assets/images/logo.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../css/Header.css';
const Header = (props) => {
  async function handleLogout(){
    try{
    await axios.post("http://localhost:3000/register/logout");
    }
    catch(err){
      console.log(err);
    }
    }
    const [isCollapsed, setIsCollapsed] = useState(true);
    // Toggle the collapse state when the button is clicked
    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark headerbg" style={{zIndex:3}}>
            <div className="container">
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
        <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggle}
        aria-controls="navbarNavAltMarkup"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNavAltMarkup">
        <div className="navbar-nav">
        <NavLink to="/home" className="nav-link">Home</NavLink>
          {props.Role==='Client'?<NavLink to="/gallery" className="nav-link">Gallery</NavLink>:null}
          {props.Role==='Client'?<NavLink to="/auctions" className="nav-link">Auctions</NavLink>:null}
          {props.Role==='Client'?<NavLink to="/artists" className="nav-link">Artists</NavLink>:null}
          <NavLink to="/Exhibitions" className="nav-link">Exhibitions</NavLink>
          {props.Role == null && <NavLink to="/Login" className="nav-link">Login/SignUp</NavLink>}
          {props.Role==='Admin'?<NavLink to="/admin" className="nav-link">Admin</NavLink>:null}

        
          {props.Role==='Artist'?<NavLink to="/portfolio" className="nav-link">portfolio</NavLink>:null}  
          {props.Role==='Client'?<NavLink to="/following" className="nav-link">following</NavLink>:null}
          {props.Role==='Client'?<NavLink to="/wishlist" className="nav-link">wishlist</NavLink>:null}
          {props.Role==='Artist'?<NavLink to="/Reciepts" className="nav-link">Sold Arts</NavLink>:null}
          {props.Role==='Artist'?<NavLink to="/followers" className="nav-link">followers</NavLink>:null} 
          {props.Logged==='true'?<NavLink to="/FeedBack" className="nav-link">Add Feedback</NavLink>:null} 
          {props.Logged==='true'?<NavLink to="/Settings" className="nav-link">Settings</NavLink>:null}
          {props.Role==='Client'?<NavLink to="/Purchase-history" className="nav-link">Purchase History</NavLink>:null}
          {props.Logged==='true'?<button className="nav-link" onClick={handleLogout}>Logout</button>:null}
        </div>
      </div>
      </div>
    </nav>
  );
}

export default Header;
