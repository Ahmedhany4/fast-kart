import React, { useState } from 'react';
import './css/checkout-form.css'
const CheckoutForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zip: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (event, section) => {
    const { name, value } = event.target;
    if (section === 'userInfo') {
      setUserInfo({ ...userInfo, [name]: value });
    } else if (section === 'shippingInfo') {
      setShippingInfo({ ...shippingInfo, [name]: value });
    } else if (section === 'paymentInfo') {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    // خد البيانات اعمل بيها اللي انت عايزو 
    event.preventDefault();
    console.log('User Info:', userInfo);
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Info:', paymentInfo);
  };

  return (
    <div className='checkout-form'>

    <h1 className='title'>Checkout</h1>
    <form onSubmit={handleSubmit} className="form-container">
    <h2 className="form-heading">User Information</h2>
    <input type="text" name="name" placeholder="Name" value={userInfo.name} onChange={(e) => handleInputChange(e, 'userInfo')}  required className="form-input"/>
    <input type="email" name="email" placeholder="Email" value={userInfo.email} onChange={(e) => handleInputChange(e, 'userInfo')} required className="form-input"/>
  


    <h2 className="form-heading">Shipping Information</h2>
    <input type="text" name="address" placeholder="Address" value={shippingInfo.address} onChange={(e) => handleInputChange(e, 'shippingInfo')} required className="form-input"/>
    <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={(e) => handleInputChange(e, 'shippingInfo')} required className="form-input"/>
    <input type="text" name="zip" placeholder="Zip Code" value={shippingInfo.zip} onChange={(e) => handleInputChange(e, 'shippingInfo')} required className="form-input"/>



    <h2 className="form-heading">Payment Information</h2>
    <input type="text" name="cardNumber" placeholder="Card Number" value={paymentInfo.cardNumber} onChange={(e) => handleInputChange(e, 'paymentInfo')} required className="form-input" />
    <input type="text" name="expiryDate" placeholder="Expiry Date" value={paymentInfo.expiryDate} onChange={(e) => handleInputChange(e, 'paymentInfo')} required className="form-input" />
    <input type="text" name="cvv" placeholder="CVV" value={paymentInfo.cvv} onChange={(e) => handleInputChange(e, 'paymentInfo')} required className="form-input"/>
  
    <button type="submit" className="form-button">Submit</button>
  </form>  
    </div>
  );
};

export default CheckoutForm;
