import React, { useState, useEffect } from 'react'
import Sign from './API/Authpage'
import axios from 'axios'
import Snackbar from "@mui/material/Snackbar"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './Contextapi'


const Signup = () => {
    const navigator = useNavigate();
    const [Fullname, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    

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
    
     const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    };




const handlbutton = async (e) => {
    e.preventDefault()
    setName("")
    setEmail("")
    setPassword("")
    if (!validateEmail(email)) {
        showSnackbar("❌ Invalid Email");
        return;
    }
    if (!Fullname || !email || !password) {
        showSnackbar("❌ All fields are required");
        return;
    }
    
    try{
        let  res = await  axios({
            method: "POST",
            url: "http://localhost:3000/OTP/send-otp",
            data: {
                email
            }
        })
        
        if(res.status === 200) {
            showSnackbar("✅ OTP sent to your email");
            navigator("/verify")
            localStorage.setItem("email", email); // Store email for verification
            localStorage.setItem("Fullname", Fullname);
            localStorage.setItem("password", password);
        }

        } catch (error) {
            showSnackbar("❌ Error sending OTP");
        }

        
        
          
    }
    
    return (
        <>
            <div>
                <h1 className='text-black-900  font-bold absolute z-9 text-3xl ml-18 mt-4'>Scatch</h1>
            </div>
            <div className='h-screen w-1/2   relative bg-[#b9b9c7] flex'>
                <div className='w-1/6 h-full bg-white  '></div>
                <div className='w-5/6 h-full'>
                    <div className='flex justify-center flex-col  h-full ml-25 '>
                        <h2 className='text-3xl font-bold leading-3 '>Welcom to <span className='text-[#1a8cc0] text-4xl '>Scatch</span><br /><span className='text-2xl'>create a account</span></h2>
                        <div className='mt-5 gap-3 flex flex-col '>
                            <div className='w-70 bg-white h-10 rounded'>
                                <input
                                    value={Fullname}
                                    onChange={(e) => { setName(e.target.value) }}
                                    className='w-full text-md px-5  py-2 outline-none ' type="text" placeholder=' Fullname'  />
                            </div>
                            <div className='w-70 bg-white h-10 rounded'>
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className='w-full text-md px-5  py-2 outline-none ' type="email" placeholder='Email'  />
                            </div>
                            <div className='w-70 bg-white h-10 rounded'>
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className='w-full text-md px-5  py-2 outline-none ' type="password" placeholder=' Password' />
                            </div>
                            <button
                                onClick={handlbutton}
                                className='w-40 h-11 mt-8 text-md bg-[#1a8cc0] text-white rounded-md px-2 py-1'>
                                Create my account
                            </button>
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
                </div>
            </div>
           
            
        </>
    )
}

export default Signup
