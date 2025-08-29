// Contextapi.jsx
import { useState, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [product, setProduct] = useState(null);
  const [response, setResponse] = useState(null);
  const [id, setId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Fetch product detail
  const detailProduct = async (id, token) => {
    try {
      const API = import.meta.env.VITE_API;
      const res = await axios.get(
        `${API}/dashboard/detail/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(res.data); // ✅ Response store in state
      return res.data;      // ✅ Return also (optional)
    } catch (err) {
      console.error("❌ Error fetching product detail:", err.message);
    }
  };

  

  return (
    <UserContext.Provider value={{ product, detailProduct, setId , id , response, setResponse , cartItems, setCartItems }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
