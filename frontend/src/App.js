import React  from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './apis/Loginpage.js';
import Signup from './apis/Signpage.js';
import Navbar from './apis/Navbar.js';
import Profile from './apis/profilepage';
import Products from './apis/Productpage.js';
import Home from './apis/home.js';
import Cart from './apis/cart.js';
import Checkout from './apis/successpage.js';
import CancelPage from './apis/cancelpage.js';
import Order from './apis/orderpage.js';




function App() {
  return (
   
    <Router>
      <Navbar/>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/successpage" element={<Checkout/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/cancel" element={<CancelPage/>}/>
      <Route path="/order" element={<Order/>}/>
    
    </Routes>
  </Router>
  );
}

export default App;
