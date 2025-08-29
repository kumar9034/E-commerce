import React, { useState } from 'react'
import axios from 'axios'
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      vertical: "top",
      horizontal: "center",
    });
    const { vertical, horizontal, open, message } = snackbar;

  const showSnackbar = (msg) => {
    setSnackbar({ ...snackbar, open: true, message: msg });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlbutton = async (e) => {
    e.preventDefault()
    setEmail("")
    setPassword("")
    console.log("User logged in:", { email, password })
    try {
      const API = import.meta.env.VITE_API;
     let res = await axios({
        method: 'post',
        url: `${API}/users/login`,
        data: {
          email,
          password,
        }
      })
      if (res.status === 200) {
        showSnackbar("✅ Login successful");
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 4000);
      }
      if(res.status === 401) {
        showSnackbar("❌ Invalid email or password");
      }

  } catch (error) {
    showSnackbar("⚠️ Server error");
  }
}

return (
  <div className='h-screen w-1/2 flex  '>
    <div className='w-2/8 h-full flex justify-center items-center'> <h1 className='text-3xl text-white w-15 h-15 rounded-full bg-[#1a8cc0] flex justify-center py-2 ml-7 font-bold '>or</h1></div>
    <div className='w-6/8 h-full flex flex-col justify-center ml-25  '>
      <div>
        <h1 className='text-black font-bold text-2xl'>Login you account </h1>
      </div>
      <div className=' flex-col flex gap-5 mt-5'>
        <div className='w-70 h-10 bg-[#cdcdd4] rounded'>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="text" className=' px-5 w-full h-full py-1 outline-none placeholder:text-black' placeholder='Email' />
        </div>
        <div className='w-70 h-10 bg-[#cdcdd4] rounded'>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password" className=' w-full h-full px-5 py-1 outline-none  placeholder:text-black' placeholder='Password' />
        </div>
      </div>
      {
      <button

      onClick={handlbutton}
      className='w-20 h-11 mt-8 text-md bg-[#1a8cc0] text-white rounded-2xl px-2 py-1'>
      Login
      </button>
      }
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={3000}
      />
    </div>
  </div>
)
}

export default Login
