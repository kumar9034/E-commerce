import React from 'react'
import { useState } from 'react';
import Snackbar from "@mui/material/Snackbar"
import axios from 'axios';


const Popup = ({ onClose }) => {
    const [mobile, setMobile] = useState("");

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

    const verifynumber = async (e) => {
        e.preventDefault();
        setMobile("")
        console.log(mobile)
        const token = localStorage.getItem("token");
       const API = import.meta.env.VITE_API_URL;
           let res =  await axios({
                method: "POST",
                url: `${API}/users/contact-number`,
                data:{
                    mobile
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                showSnackbar("✅ Phone number verified successfully");
            } else {
                showSnackbar("❌ Phone number verification failed");
            }
         
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-5 h-60 rounded shadow-md'>
                <h1 className='text-3xl font-[800] leading-6 '>wellcome to scatch <br /> <span className='text-lg font-[900] text-[#1a8cc0] '> varification phone number</span></h1>
                <p className='text-sm font-[400] text-[#878787] mt-2'>Please enter your phone number to continue</p>
                <div className='w-50 h-10 border-1 border-gray-300 rounded p-2 mb-3 ml-10 mt-3'>
                    <input
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className='w-full h-full outline-none' type="text" placeholder='phone no.' />

                </div>
                <button
                    onClick={onClose}
                    className='bg-blue-500 text-white px-4 py-2 rounded'>close</button>
                <button
                    onClick={verifynumber}
                    className='bg-blue-500 ml-28 mt-5 text-white px-4 py-2 rounded'>continue</button>
            </div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
                autoHideDuration={3000}
            />
        </div>
    )
}

export default Popup
