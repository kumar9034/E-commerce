import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from "@mui/material/Snackbar"



const Verify = () => {
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


    const navigator = useNavigate()
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const [Fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const emails = localStorage.getItem("email")
        const fullname = localStorage.getItem("Fullname")
        const password = localStorage.getItem("password")
        setEmail(emails)
        setPassword(password)
        setFullname(fullname)

    })


    const verifyotp = async (e) => {
        // e.preventDefault()
        setOtp("")
        const API = import.meta.env.VITE_API_URL;
        const res = await axios({
            method: "POST",
            url: `${API}/OTP/verify-otp`,
            withCredentials: true,
            data: {
                otp,
                email
            }
        })
        if (res.status === 200) {
            navigator("/")
            const API = import.meta.env.VITE_API_URL;
            let res = await axios({
                method: 'post',
                url: `${API}/users/signup`,
                data: {
                    Fullname,
                    email,
                    password
                }
            })
            console.log(res)
            if (res.status === 200) {
                showSnackbar("✅ Signup successful");
                localStorage.removeItem("verify")
            }
            else {
                showSnackbar("❌ Signup failed");
            }
            localStorage.removeItem("email"); // Clear email after verification

        }
    }

    return (
        <div className='w-full h-screen flex '>
            <div>
                <h1 className='text-black-900  font-bold absolute z-9 text-3xl ml-24 mt-4'>Scatch</h1>
            </div>
            <div className='w-1/9 h-full'></div>
            <div className='w-8/9 h-full bg-[#b9b9c7] flex flex-col justify-center items-center'>
                <div>
                    <h1 className='text-black-900 font-bold text-4xl'>Welcome to scatch <br /> <span className='text-[#1a8cc0] text-2xl font-bold'> verification to OTP</span></h1>
                </div>
                <div>
                    <div className='flex justify-center items-center gap-5 mt-10'>
                        <h1 className='text-black-900 font-semibold text-xl'>Email address : <span className='text-sm border-2 border-black font-semibold rounded-lg p-2'>{email}</span> </h1>

                    </div>
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <h1 className='text-black-900 font-semibold text-xl'>Enter OTP : </h1>
                        <input type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='border-2 rounded-md outline-none p-2 mt-2' />
                    </div>

                </div>
                <button onClick={() => verifyotp()} className='bg-[#1a8cc0] ml-50 mt-10 text-white font-semibold py-2 px-4  rounded-md mt-5'>
                    Verify OTP
                </button>
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

export default Verify
