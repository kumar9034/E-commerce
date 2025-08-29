import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./Contextapi";

const Finalorder = () => {
  const { response } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (response === 200) {
        try {
          const api = import.meta.env.VITE_API;
          const token = localStorage.getItem("token");

          const res = await axios.get(`${api}/users/my-orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("📦 Orders:", res.data);
          setOrders(res.data.orders || []);
        } catch (error) {
          console.error("❌ Error fetching orders:", error);
        }
      }
    };
    fetchOrderDetails();
  }, [response]);

  return (
    <div>
      <div className="w-full h-40 text-3xl font-[700] flex justify-center items-center">
        <h1>Your order has been placed successfully ✅</h1>
      </div>

      {orders.map((order, index) => (
        <div
          key={index}
          className="border w-[80%] flex ml-30  rounded-lg shadow-md p-4 m-4 bg-gray-50"
        >
          <h2 className="text-xl font-bold mb-2">Order Details</h2>

          {/* Product Details */}
          {order.product.map((prod, i) => (
            <div key={i} className="mb-2 w-70">
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-30 h-28 object-contain rounded-md mt-2"
                />
              )}
              <p>
                <strong>Product Name:</strong> {prod.name}
              </p>
              <p>
                <strong>Price:</strong> ₹{prod.price}
              </p>
            </div>
          ))}

          {/* Shipping Address */}
          {order.address.length > 0 && (
            <div className="mt-2 w-88">
              <p className="flex-wrap flex-col ">
                <strong>Shipping Address:</strong>{" "}
                {order.address[0].house_no}, {order.address[0].village},{" "}
                {order.address[0].city}, {order.address[0].state},{" "}
                {order.address[0].country} - {order.address[0].pincode}
              </p>
            </div>
          )}

          {/* Customer Info */}
          <div className="mt-2">
            <p>
              <strong>Customer:</strong> {order.fullname} ({order.phone_no})
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-45 absolute ml-[66%]">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex w-30 text-white cursor-pointer bg-blue-500 hover:bg-blue-700 rounded-md px-3 py-2">
              Go to Home
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Finalorder;
