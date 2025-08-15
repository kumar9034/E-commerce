import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(1);
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      return navigate("/");
    }

    try {
      console.log(token)// ya sessionStorage
      let res = await axios.get("http://localhost:3000/dashboard/shop", {
        headers: {
          Authorization: `Bearer ${token}`, // ya sessionStorage
        }
      });

      console.log("Dashboard data:", res.data);
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
  const addtocart = async ()=>{
   const res = await axios({
     url: `http://localhost:3000/dashboard/addtocart/${productId}`,
     method: "GET",
     withCredentials: true,
     headers: {
       "Content-Type": "application/json"
     }
   })
   console.log("Add to cart response:", res.data);
  }


  return (
    <div >

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
            <div className='flex flex-wrap gap-10'>
              {data.map((items, id) => {
                return <div key={id} className='w-60 mt-5 h-72 border-1 border-gray-500 cursor-pointer rounded'>
                  <div className='h-3/5'>
                    <img className='w-full h-full object-cover rounded-t ' src={items.image} alt="" />
                  </div>
                  <div className='h-2/5 px-3 py-2 text-black w-full  '>
                    <p className='text-sm font-semibold' >{items.name}</p>
                    <div className='flex  '>
                      {/* <p >description</p> */}
                      <p className='text-md font-bold mt-3 '><span className='text-red-600 font-[400] mr-30'>-50%</span>{items.price}</p>
                    </div>
                    <div className='flex justify-between'>
                      <button className='w-20 cursor-pointer text-white mt-3  h-8 font-bold text-sm bg-[#fb641b] rounded-xl'>
                        Buy now
                      </button>
                      <button
                        // onClick={addtocart}
                        className='w-20 cursor-pointer text-white mt-3  h-8 font-bold text-sm bg-[#453C05] rounded-xl'>
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
