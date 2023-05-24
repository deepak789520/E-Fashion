import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/order.css';

const host = process.env.REACT_APP_SERVER_URL;

const Order = () => {
  const token = Cookies.get('token');
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          setTimeout(() => {
            alert('Please log in once again');
            window.location.href = '/login';
          }, 3000);
        }
        const response = await axios.get(`${host}api/getorder`, {
          headers: { Tokenheaders: token },
        });

        if (response.status === 200) {
          setOrders(response.data);
          console.log(orders)
        }


      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await axios.get(`${host}api/getuser`, {
          headers: { Tokenheaders: token },
        });

        if (user.status === 200) {
          setUserData(user.data);

        }
      } catch (error) {

        console.log(error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, []);


  const openOrderDetails = (order) => {
    setDetails(order);
  };

  const handleCancelDetails = () => {
    setDetails(null);
  }

  return (

    <div className="user-orders-container">
      <h1>User Orders</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Quantity</th>
            <th>Payment Status</th>
            <th>Order Placed Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="order-row" key={order._id}>
              <td>
                {order.products.map((product) => (
                  <div key={product._id} className="product-details">
                    <h5>{product.name}</h5>
                  </div>
                ))}
              </td>
              <td>
                <ul className="product-list">
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <div>
                        <p>{product.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td >{order.payment_status}</td>
              <td> {new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="order-details-button" onClick={() => openOrderDetails(order)}>
                  More details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {details && (
        <div className='background-details' > <div className="order-summary-page">
          <p><b>Name:</b>{userData.firstname.toUpperCase()}.{userData.lastname.toUpperCase()} </p>
          <p><b>Email:</b> {userData.email}</p>
          <p><b>Phone:</b> {userData.phone}</p>
          <p><b>Transaction ID: </b>{details.paymentIntentId}</p>
          <p>
            <b>Shipping Address: </b>{details.shippingaddress.house},{details.shippingaddress.city}, {details.shippingaddress.state},{details.shippingaddress.country},{details.shippingaddress.code}
          </p>
          <p><b>Total: </b>{details.total / 100}/-</p>
          <p><b>Shipping Charges :</b> Free</p>
          <p><b>Subtotal: </b>{details.subtotal / 100}/-</p>
          <p><b>Order Date:</b> {new Date(details.createdAt).toLocaleDateString()}</p>
          <button className='btnnn' onClick={handleCancelDetails}>Close</button>
        </div></div>
      )}
    </div>


  );

}

export default Order;
