import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
     const navigate = useNavigate();
const token = localStorage.getItem("token")
useEffect(()=>{
    if (!token) {
      return navigate("/");
    }

})
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {/* Cart items will be displayed here */}
    </div>
  )
}

export default Cart
