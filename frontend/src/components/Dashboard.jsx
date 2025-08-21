import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import Productdetail from './Productdetail';
import { UserContext } from './Contextapi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(1);
  const [data, setData] = useState([]);
  // const [popupshow, setPopupshow] = useState(false);


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      return navigate("/");
    }
    
    try {
      let res = await axios.get(`${process.env.BACKEND_URL}/dashboard/shop`, {
        headers: {
          Authorization: `Bearer ${token}`, // ya sessionStorage
        }
      });
      setData(res.data)

      if (res.config.co) {

      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    }
  }
  useEffect(() => {
    fetchData()

  }, [])

  

   const { detailProduct } = useContext(UserContext);

   const detailproduct = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      await detailProduct(id, token); // ✅ API call + context update
      navigate("/detail");           // Go to detail page
    } else {
      navigate("/");
    }

  }
  


  return (
    <div >

         {/* {popupshow && <Popup onClose={() => setPopupshow(false)} />} */}
      <Navbar logo={"Shop."} />
      <div className='w-full h-full flex'>
        <div className='w-1/5  h-[32.5rem]  py-10  border-r-2 border-gray-500'>
          <h1
            onClick={() => setView(1)}
            className='text-lg font-[500] mb-2 cursor-pointer hover:bg-gray-200 pl-10'>All products</h1>
          <h1
            onClick={() => setView(2)}
            className='text-lg font-[500] mb-2 cursor-pointer hover:bg-gray-200 pl-10'>New products</h1>
          <h1
            onClick={() => setView(3)}
            className='text-lg font-[500] mb-2 cursor-pointer hover:bg-gray-200 pl-10'>Discounted products</h1>

        </div>
        <div className='w-4/5 h-[32.5rem] pl-10 pt-5'>
          {view === 1 && <div>
            <h1 className='text-2xl font-bold '>All Products</h1>
            <div className='flex flex-wrap gap-5'>
              {data.map((items, id) => {
                return <div key={id}
                className='w-55 mt-5 h-90 border-1 border-gray-500 overflow-hidden  cursor-pointer rounded'>
                  <div
                   onClick={()=>{detailproduct(items._id)}}
                   className='h-5/9 flex justify-center items-center '>
                    <img className='  h-full object-contain rounded-t ' src={items.image} alt="" />
                  </div>
                  <div className='h-4/8 px-3 py-2 text-black w-full  '>
                    <p className='text-sm line-clamp-2 font-semibold' >{items.name}</p>
                    <p className='text-[13px] font-400 text-[#878787]'>stock {items.stock}</p>
                    <p className='text-[12px] font-[600] '>Rating <span className='w-10 h-10 ml-5 rounded bg-[#388e3c] p-1 text-white text-[10px]'>{items.rating} ★</span></p>
                    <div className='flex  '>
                      {/* <p >description</p> */}
                      <p className='text-md font-bold  '>₹{items.discountedPrice}<span className='text-[#878787] ml-2 font-[400] line-through '>₹{items.price}</span><span className='text-[#388e3c] text-[15px] ml-3'>{items.discount}% off</span></p>
                    </div>
                    <div className='flex justify-between'>
                      <button
                      // onClick={()=>setPopupshow(true)}
                      className='w-20 cursor-pointer text-white mt-3  h-8 font-bold text-[13px] bg-[#fb641b] rounded-xl'>
                        Buy now
                      </button>
                      <button
                        onClick={() => addtocart(items._id)}
                        className='w-20 cursor-pointer text-white mt-3  h-8 font-bold text-[13px] bg-[#453C05] rounded-xl'>
                        Add cart
                      </button>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>}
          {view === 2 && <div>New products content</div>}
          {view === 3 && <div>Discounted products content</div>}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
