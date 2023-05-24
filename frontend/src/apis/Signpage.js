import React, { useState } from 'react';
import axios from 'axios';
import '../styles/page.css';
const host=process.env.REACT_APP_SERVER_URL;



function Signup() {
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [success,setsucess]= useState(false);
  const [unsuccess,setunsucess]= useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}api/register`, {
        firstname,
        lastname,
        email,
        phone,
        password
      });

      if (response.status === 200) {
        // Successful response 
        console.log("login sucessfull")
        document.cookie = `User:token=${response.token};`;
        setsucess(true);
        setunsucess(false);
        setTimeout(() => {
          window.location.href = "/login" ; // Replace '/home' with your home page URL
        }, 2000);

      } 
     
    } catch (error) {
      console.log(error);
      setunsucess(true);
      setsucess(false);
    }
  };

  return (
<div>
    <div className='baground'>
     
    <form onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <div>
        <label htmlFor="name">First Name:</label>
        <input
          type="text"
          id="fname"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Last Name:</label>
        <input
          type="text"
          id="lname"
          value={lastname}
          placeholder="Secound Name"
          onChange={(e) => setLname(e.target.value)}
          required
        />
      </div>
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
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
      {success && <b>Register Successfully...</b>}
     {unsuccess && <b>Invalid Credentials...</b>}
      <a href="/login">Dont have an account? Login here</a><br/>
      
    </form>
     </div>
     </div>
  );
}

export default Signup;