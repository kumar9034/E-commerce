// Contextapi.jsx
import { useState, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [product, setProduct] = useState(null);

  // Fetch product detail
  const detailProduct = async (id, token) => {
    try {
      const API = import.meta.env.VITE_API_URL;
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
    <UserContext.Provider value={{ product, detailProduct }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
