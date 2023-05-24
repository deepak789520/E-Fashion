import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


const Navbar = () => {
  const [LoggedIn, setLoggedIn] = useState(false);

useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
      }
     else {
      setLoggedIn(false);
    }
  }, []);
 



  const handleLogout = () => {
    // handle logout logic
    Cookies.remove('token');
    localStorage.removeItem('cart'); 
    setLoggedIn(false);
    window.location.href="/"
  };

  return (
        <nav className="navbar">
          <div className="navbar-logo">
            <img alt='' src="https://cdn6.aptoide.com/imgs/e/f/e/efecf874261d2a95a3a0b61310db2423_icon.png"></img>
            <b className='hhh'>Fashion Trends</b>
          </div>
        
          <div className="navbar-buttons">
            {LoggedIn ? (
              <>
                <div className='list'> 
          <ul className="navbar-links">
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
          </ul>
          </div>
                <button className="navbar-button" onClick={handleLogout}>
                  Logout
                </button>
                <Link to="/Profile">
                <button className="navbar-button1" id="profile-btn">
                Profile
                </button></Link>
              </>
            ) : (
              <>
                <div className='list'> 
          <ul className="navbar-links">
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
          </div>
                <Link to="/login">
                <button className="navbar-button">Log In</button>
                  
                </Link>
                <Link to="/signup">
                <button className="navbar-button1">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </nav>
      
      );
    };
   

export default Navbar;