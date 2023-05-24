import '../styles/success.css';

const Checkout = ()=>{
    const handlebtn=()=>{
        window.location.href="/products"
        localStorage.removeItem('cart'); 
    }
    const handleorder=()=>{
        window.location.href="/order"
        localStorage.removeItem('cart');
    }
    return(
    <div className= "pagehead">
        <div className="container">
        <h1>Payment Successful</h1>
        <p>Thank you for your purchase!</p>
        <p>Your order has been successfully processed.</p>
        <button className="sucessbtn" onClick ={handlebtn}>Continue Shopping</button>
        <button className="sucessbtn" onClick ={handleorder}>Order Details</button>
      </div>
      </div>
    )
}
export default Checkout;