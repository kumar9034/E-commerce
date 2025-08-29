import React, { use, useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './Contextapi'
import axios from 'axios'
import Snackbar from "@mui/material/Snackbar"

const Adress = () => {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState("")
  const [phone_no, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [village, setVillage] = useState("")
  const [house_no, setHouseNo] = useState("")

 const fetchData = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      return navigate("/");
    }
  }
const {setResponse} = useContext(UserContext)
  useEffect(() => {
    fetchData();
  }, []);


  const handleBack = () => {
    navigate("/detail")
  }
  const { id } = useContext(UserContext)

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


  const handleContinue = async (e) => {
    // e.preventDefault(); // Call the order function from context to send data to backend
    setFullname("")
    setPhone("")
    setCountry("")
    setState("")
    setPincode("")
    setCity("")
    setVillage("")
    setHouseNo("")



    if (!fullname || !phone_no || !country || !state || !pincode || !city || !village || !house_no) {
      showSnackbar("Please fill all fields");
      return;
    } else {
      try {
        const api = import.meta.env.VITE_API

        const token = localStorage.getItem("token")
        const res = await axios.request({
          method: "POST",
          url: `${api}/users/address`,
          data: {
            id,
            fullname,
            phone_no,
            country,
            state,
            pincode,
            city,
            village,
            house_no
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data)
        if (res.status === 200) {
          showSnackbar("✅ Order placed successfully");
          setTimeout(() => {
            navigate("/finalorder");
          }, 2000);

          setResponse(res.status)
        } else {
          showSnackbar("❌ Failed to place order");
        }

      } catch (err) {
        console.error("❌ Error placing order:", err.message);
      }

    }
    try{
      const token = localStorage.getItem("token");
      const api = import.meta.env.VITE_API;
      const res = await axios.post(
        `${api}/users/send-email`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

    }catch(err){
      console.error("❌ Error sending email:", err.message);
    }
  }
 

  return (
    <div>
      <Navbar logo={"Scatch"} />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={3000}
      />
      <div className='flex flex-col gap-5 items-center pt-3'>
        <h1 className='text-3xl font-[600] text-black'>User Address</h1>
        <div className='flex items-center justify-center gap-10'>
          <div className='w-[60%] h-auto flex  flex-wrap justify-center gap-5 border-2 border-gray-300 rounded-md p-10'>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>full name:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='full name' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>phone no:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={phone_no}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='phone no' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>country:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='country' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>state:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='state' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>pin code:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='pin code' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>city:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='city' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>village:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='village' />
              </div>
            </div>
            <div className='flex gap-3 h-8 '>
              <span className='text-black text-sm mt-1 h-8 '>building, house no , secter no:</span>
              <div className='w-45 h-8 border-1 border-gray-300 rounded '>
                <input
                  value={house_no}
                  onChange={(e) => setHouseNo(e.target.value)}
                  className='w-full h-8 p-2 outline-none' type="text" placeholder='building, house no , secter no' />
              </div>
            </div>

            <div className='flex  gap-35' >
              <button
                onClick={() => handleBack()} className='w-20 h-10 bg-blue-500 text-white rounded-md text-lg '>
                Back
              </button>
              <button
                onClick={() => handleContinue()}
                className='w-20 h-10 bg-blue-500 text-white rounded-md text-md p-1 '>
                continue
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Adress
