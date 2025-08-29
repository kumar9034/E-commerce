import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Contextapi';


const Cart = () => {
  const [items, setItems] = useState([]);

     const navigate = useNavigate();

const token = localStorage.getItem("token")


const { cartItems } = useContext(UserContext);
useEffect(() => {
  const fatchdata= async()=>{
    try{
      const api = import.meta.env.VITE_API;
      const res =  await axios.get(`${api}/dashboard/addtocart/${cartItems}`,
         {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log("Cart items response:", res);
    } catch (error) {
      console.error("Error checking token:", error);
    }
  }
const getcart = async ()=>{
  try {
    const api = import.meta.env.VITE_API;
    const res = await axios.get(`${api}/dashboard/getcart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Cart items:", res);
    setItems(res.data);
  } catch (error) {
    console.error("Error checking token:", error);
  }
}

  fatchdata()
  getcart()
}, [cartItems])

// const handleremove = async()=>{
//   const api = import.meta.env.VITE_API
//   const res = await axios.put(`${api}/dashboard/removecart/${userid}/${productid}`)
// }

  return (
    <div className='w-full h-screen py-8 '>
      <h1 className='text-center text-2xl font-bold flex justify-center  items-center w-full'>Your Shopping Cart</h1>

      <div className='flex overflow-y-auto border-1 h-[80vh] mt-4  ml-8 w-[95vw]'>
        <div>
            {items.map(item => (
              <div key={item.id} className='flex w-full  items-center border-b p-4'>
                <div className='flex w-[100%]'>
                  <img className='w-24 h-24 object-contain' src={item.image} alt={item.name} />
                  <h2 className='text-lg font-semibold'>{item.name}</h2>
                  <p className='text-gray-600'>Price: ₹{item.price}</p>
                </div>
                <button className='ml-10 bg-red-500 text-white px-4 py-2 rounded'>
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Cart
