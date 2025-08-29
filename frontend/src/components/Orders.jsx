import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const api = import.meta.env.VITE_API;
      const res = await axios.get(`${api}/owners/all-orders`);

      setInfo(res.data.orders || []);

      console.log("Info state:", res.data.orders);
    };
    fetchOrders();
  }, [setInfo]);

  const downloadCSV = async () => {
    try {
      const api = import.meta.env.VITE_API;
      const response = await axios.get(`${api}/owners/download`, {
        responseType: 'blob', // important for PDF
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'orders.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log('Error downloading PDF', err);
    }
  };

  return (
    <div className='w-full h-full  overflow-y-auto flex flex-col gap-3 px-5 py-5'>
      

        {info.map((item) => (
          <div key={item.id} className='border-1 flex w-full hover:scale-103 relative cursor-pointer transition-transform duration-200 border-gray-300 h-30 p-4 rounded-xl shadow-md  bg-gray-50'>
            {item.product.map((prod, id) => (< >
              <div key={id} className='w-25 h-25 flex gap-1'>
                <img key={prod.id} className='w-full h-full object-contain ' src={prod.image} alt={prod.name} />
              </div>
              <div>
                <p className='w-80 ml-3  line-clamp-2 '>{prod.name}</p>
                <p className='w-80 ml-3'> <strong className='mr-2'>Price:</strong>₹{prod.price}</p>
              </div>
            </>
            ))}
            <div className='ml-3 '>
              <p><strong className='mr-2'>name:</strong>{item.fullname}</p>
              <p><strong className='mr-2 text-sm'>phone_no:</strong>{item.phone_no}</p>
            </div>
            {item.address.map((addr, index) => (
              <div key={index} className='ml-3 flex'>
                <strong className='mr-2'>Address: </strong>
                <p className='flex flex-wrap'>{addr.house_no} , {addr.village}, {addr.city}, {addr.state}, {addr.pincode}</p>
              </div>
            ))}
            <button onClick={downloadCSV} className='bg-blue-500 w-30  h-10 absolute mt-13 ml-[84%] text-white px-4 py-2 rounded'>Download</button>
          </div>
        ))}
    </div>
  )
}

export default Orders
