import React, {  useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/profile.css';

const host = process.env.REACT_APP_SERVER_URL;


const Address=()=>{
  
    const [house, setHouse] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [code, setCode] = useState('');
    const [addAddress, setAddAddress] = useState(false);
    const [unsuccess, setUnsuccess] = useState(false);
    const token = Cookies.get('token');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post( `${host}api/address`,
            {
              house,
              city,
              state,
              country,
              code,
            },
            {
              headers: {
                Tokenheaders: token,
              },
            }
          );
    
          if (response.status === 200) {
            setAddAddress(true);
            setTimeout(() => {
             
              setAddAddress(false);
              window.location.href="/profile" 
            }, 2000);
          }
        } catch (error) {
          console.log(error);
          setUnsuccess(true);
          setTimeout(() => {
            setUnsuccess(false);; 
          }, 2000);
        }
      };
      const handleCancel = () => {
      
            window.location.href="/profile"  
      }
      
    return(

        <form className='formprofile' onSubmit={handleSubmit}>
        <h3 className='head2'>ADD NEW ADDRESS</h3>
        <label>
          House:
          <input
            type='text'
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
          </label>
          <label>
          City:
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State:
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Pin-Code:
          <input
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>
        <div className='form-buttons'>
          <button type='submit'>Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <div className='msg-div'>
        {addAddress && <p className='success'>Address added successfully!</p>}
      {unsuccess && <p className='error'>Failed to add address.</p>}</div>
      </form>
    )
}

export default Address;