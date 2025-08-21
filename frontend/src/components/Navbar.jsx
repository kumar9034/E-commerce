import React from 'react'
import axios from 'axios'

const Navbar = ({logo}) => {

  const handlelogout = async () => {
    const API = import.meta.env.VITE_API_URL;
    const res = await axios({
      url: `${API}/users/logout`,
      method: "GET",
    })
    if (res.status === 200) {
      localStorage.removeItem("token"); 
      localStorage.removeItem('Fullname')
      localStorage.removeItem('email')
      localStorage.removeItem("password")
      window.location.href = "/"; // Adjust the path as needed
    } else {
      console.error("Logout failed");
    }
    
  }

  return (
    <div className='w-full h-[60%] border-b-2 border-gray-500'>
      <div className='flex justify-between px-13 py-3 '>
        <h1 className='text-4xl text-black  font-[600] '>{logo}</h1>
        <div className='flex gap-5 '>
            <ul className='flex gap-6 text-md mt-3 font-[700] text-gray-700'>
                <li>Home</li>
                <li className='mr-10 cursor-pointer' onClick={()=> window.location.href = "/dashboard"} >Products</li>
                <li className='  cursor-pointer' onClick={()=> window.location.href = "/addtocart"}>Cart</li>
                <li>My account</li>
            </ul>
        <button
        onClick={handlelogout}
        className='w-15 h-9 mt-2 rounded-xl bg-blue-500 text-white text-sm px-1 py-1'>logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
