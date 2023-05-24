import React from 'react';
import '../styles/cancel.css';

const CancelPage = () => {

    const handleorder=()=>{
        window.location.href="/cart"
    }
  return (
    <div className="cancel-page">
      <div className="container_cancel">
        <h1>Payment Cancelled</h1>
        <p>your payment was cancelled.</p>
        <p>Please try again or contact support for assistance.</p>
        <button className='cancelbtn' onClick={handleorder}>Go Back to Cart</button>
      </div>
    </div>
  );
};

export default CancelPage;