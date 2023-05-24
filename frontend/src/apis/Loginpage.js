import React, { useState } from 'react';
import axios from 'axios';
import '../styles/page.css';
import Cookies from 'js-cookie';
const host=process.env.REACT_APP_SERVER_URL;

function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success,setsucess]= useState(false);
  const [unsuccess,setunsucess]= useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}api/login`, {
        email,
        password,
      });
     
      let token=Cookies.set('token', `${response.data}`);
      console.log(token)
      if (response.status === 200) {
        // Successful response 
        console.log("login sucessfull")
        setsucess(true);
        setunsucess(false);
        setTimeout(() => {
          window.location.href = "/" ; // Replace '/home' with your home page URL
        }, 2000);
        
      }
    } catch (error) {
      if(error.response.status === 401){
        Cookies.remove('token')
        alert("Requested time out. Please log in again")
        window.location.href="/login"
       }
      console.log("Invalid password or Email Id");
      setunsucess(true);
      setsucess(false);
    }
  };
  return (
    <div>
   
    <div className='baground'>
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email Id"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
     {success && <b>Login Successfully...</b>}
     {unsuccess && <b>Invalid Credentials...</b>}
           
      <a href="/signup">Already have an account? signup here</a>
    </form>
    </div>
    </div>

    
    
  );
}

export default Login;
