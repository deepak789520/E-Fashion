import React, { useEffect, useState } from 'react';
import "../styles/cart.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PayButton from './paymentpage';
const host = process.env.REACT_APP_SERVER_URL;

const Cart = () => {
  const [cartlist, setcartlist] = useState([]);
  const [emailid, setemailid] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const result = await axios.get(`${host}api/getaddress`, {
          headers: { Tokenheaders: token },
        });

        if (result.status === 200) {
          setAddressList(result.data);
          console.log(addressList)
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove('token');
          alert('Requested time out. Please log in again');
          window.location.href = '/login';
        }
        console.log(error);
      }
    };

    fetchAddressData();
  }, []);

  useEffect(() => {
    const fetchuserid = async () => {
      try {
        const response = await axios.get(`${host}api/getuser`, {
          headers: { Tokenheaders: token },
        });
        if (response.status === 200) {
          setemailid(response.data.email);
        }
      } catch (error) {
        if (error.response.status === 401) {
          Cookies.remove('token')
          alert("Requested time out. Please log in again")
          window.location.href = "/login"
        }
        console.log(error);
      }
    };
    fetchuserid();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setTimeout(() => {
            alert('Please log in once again');
            window.location.href = '/login';
          }, 3000);
        } else {
          const cartJson = localStorage.getItem('cart');
          const cart = JSON.parse(cartJson);

          if (!cart) {
            console.log('No products added');
          } else {
             // filter the products based on email id
            setcartlist(cart);
          }
        }
      } catch (error) {
        console.log('Error in response');
      }
    };
    fetchData();
  }, [token, emailid]);


  useEffect(() => {
    let total = 0;
    let count = 0;
    cartlist.forEach(item => {
      total += item.price * item.quantity; // iterate through all the products and multiply the price by the quantity
      count += item.quantity;
    });
    setCartTotal(total);
    setCartCount(count);
  }, [cartlist]);

  const handleRemove = (index) => {
    const updatedCart = [...cartlist];
    updatedCart.splice(index, 1);
    setcartlist(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  const handleClearCart = () => {
    setcartlist([]); 
  localStorage.removeItem('cart'); 
  }

  const handleQuantityChange = (index, value) => {
    const updatedCart = [...cartlist];
    updatedCart[index].quantity += value;

    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    } else if (updatedCart[index].quantity > 5) {
      updatedCart[index].quantity = 5;
    }

    setcartlist(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    console.log(selectedAddress)
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <h2>My Cart</h2>
        {cartlist.length === 0 ? (
          <div className='empty'>
            <p >Your cart is empty</p>
            Go back to Shopping<Link to='/products'><button> click here...</button></Link>
          </div>
        ) : (
          <div> <div className='clearcart'><button  onClick={handleClearCart}>Clear Cart</button></div>
          <div className='display'>
          
            <cartlistle className="cart-table">
              <tbody>
                {cartlist.map((data, index) => (
                  <div className='tab'>
                    <tr className='table' key={index}>
                      <div className='pro-img'>
                        <img src={data.image} alt={data.description} /></div>
                      <div className='information'>
                        <div className='pro-inf'>
                          <div className='ddd'>
                            <p className='type'>Product:{data.name}</p>
                            <div className="quantity">
                              <div className="quantity-btn" onClick={() => handleQuantityChange(index, -1)}>-</div>
                              <p> {data.quantity}</p>
                              <div className="quantity-btn" onClick={() => handleQuantityChange(index, 1)}>+</div>
                            </div>
                          </div>
                          <b className='des'>{data.description}</b>
                          <div className='aaa'>
                            <p className='price'>Price : {data.price}\-</p>
                            <div className='dis-btn'>
                              <button onClick={() => handleRemove(index)}>Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr></div>
                ))}
              </tbody>
            </cartlistle>
            <div className="order-summary">
              <div className="card">
                <h5 className="text-center">Order Summary</h5>
                <hr />
                <div className="subtotal">
                  <b>No of items: </b>
                  <b>{cartCount}</b>
                </div>
                <div className="subtotal">
                  <b>Subtotal: </b>
                  <b>{cartTotal}/-</b>
                </div>
                <div className="delivery-charges">
                  <b>Delivery Charges:</b>
                  <b className="free-shipping">FREE</b>
                </div>
                <div className="total">
                  <b>Total:</b>
                  <b>{cartTotal}/-</b>
                </div>
                <hr />
                <div className="address-select">
                  <label>Select address:</label>
                  <select className="address-dropdown" onChange={handleAddressChange}>
                    <option value="">Select Address</option>
                    {addressList.map((address) => (
                      <option key={address._id} value={JSON.stringify(address)}>
                        {address.house}, {address.city}, {address.state}, {address.code},
                      </option>
                    ))}
                  </select>
                  {selectedAddress ? (
                    <PayButton cartlist={cartlist} address_list={JSON.parse(selectedAddress)}/> 
                  ) : (
                    <p className="address-placeholder">Please select an address.</p>
                  )}
                </div>
              </div>
            </div>
          </div></div>
        )}
      </div>
    </div>

  );
}

export default Cart;