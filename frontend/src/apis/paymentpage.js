import axios from "axios";
import React, { useEffect, useState } from 'react';
import "../styles/cart.css"
import Cookies from "js-cookie";
const host=process.env.REACT_APP_SERVER_URL;
const token = Cookies.get('token')

const PayButton=({cartlist,address_list})=>{
  const [userid, setuserid] = useState('');
  useEffect(() => {
    const fetchuserid = async () => {
      try {
        const response = await axios.get(`${host}api/getuser`, {
          headers: { Tokenheaders: token },
        });
        if (response.status === 200) {
          setuserid(response.data._id);

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

  const cart = cartlist.map(data => ({
    id: data._id,
    name: data.name,
    price: data.price,
    quantity: data.quantity
  }));
  const address={
   house: address_list.house,
   city: address_list.city,
   state: address_list.state,
   country: address_list.country,
   code: address_list.code,
  };
  console.log("new address",address)
  console.log("new address",address_list)

  const handlecheckout=()=>{
   axios.post(`${host}api/payment-checkout`,
   {
    cart,
    userid,
    address,
  },
  )
  .then((res)=>{ 
    if(res.data.url){
      window.location.href= res.data.url;
   }})
   .catch((err)=>console.log(err.message));
  };

    return(
        <>
        <button  className="checkbutton" onClick={()=>handlecheckout()}>checkout</button>
        </>
    );
};
export default PayButton;