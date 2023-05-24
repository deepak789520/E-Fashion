import React, { useEffect, useState } from 'react';
import '../styles/products.css';
import axios from 'axios';
import Cookies from 'js-cookie';
const host=process.env.REACT_APP_SERVER_URL;

const Product = () => {
  const [userData, setUserData] = useState([]);
  const [userid, setUserid] = useState('');
  const [type, setType] = useState('');
  const [rate, setRate] = useState('');
  const [showMessage, setShowMessage] = useState(false);


  const token=Cookies.get('token')

  useEffect(() => {
const fetchProduct = async () => {
      try {
        const response = await axios.get(`${host}api/getproducts`);
       
        if (response.    status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.log('error in response');
      }
    };
    fetchProduct();
  }, []);
 

  const handleFilterClick = (event) => {
    setType(event.target.value);
  };


  const handleCart = (event, product) => {
    event.preventDefault(); // prevent default form submission behavior
     
    if (!token) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        window.location.href="/login"
      }, 3000);
    } else {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1000);
    }
      // Get existing cart from local storage
      const cartJson = localStorage.getItem('cart');
      const cart = cartJson ? JSON.parse(cartJson) : [];
   
  
      // Append new product to cart
      const newProduct = {...product,quantity:1};
      const newCart = [...cart, newProduct];
  
      // Convert cart array to JSON string
      const newCartJson = JSON.stringify(newCart);  
  
      // Set new cart JSON string to local storage
      localStorage.setItem('cart', newCartJson);
     
      // Get existing cart from local storage  
  }
  const handleRate = (event) => {
    setRate(Number(event.target.value));
  };

  const filteredProducts = userData.filter((data) => {
    return (!type || data.category === type) && (!rate || data.price <= rate);
  });

  return (
    <div className='product'>

      <div className='btnn'>
        <div className='dropdown'>
          <button>Filter:</button>
          <select onChange={handleRate}>
            <option value=''>All</option>
            <option value='300'>Less than Rs. 300</option>
            <option value='500'>Less than Rs. 500</option>
            <option value='1000'>Less than Rs. 1000</option>
            <option value='1500'>Less than Rs. 1500</option>
          </select>
        </div>
        <button value='' onClick={handleFilterClick}>All</button>
        <button value='Men' onClick={handleFilterClick}>MEN</button>
        <button value='Women' onClick={handleFilterClick}>WOMEN</button>
        <button value='kids' onClick={handleFilterClick}>KIDS</button>
        
      </div>
      {showMessage&&  (token ? ( 
        <div className='notification'>Product added to cart</div>
      ) : (
        <div className='notifications'>Please login...</div>
      ))}
      <div className='shopping-cards'>
        {filteredProducts.map((data, index) => (
          <form className='productform' key={index}>
            <img src={data.image} alt={data.image}></img>
            <div className='details'>
              <p className='category'>For {data.category}</p>
              <p className='amount'>{data.price} /- </p>
            </div>
            <b className='description'>
        <span className="truncate">{data.name}</span>
        <span className="full-description">-{data.description}</span>
      </b>
            <button onClick={(event)=>handleCart(event,data)}>ADD TO CART</button>
          </form>
        ))}
      </div>
    </div>
  );
}

export default Product;
