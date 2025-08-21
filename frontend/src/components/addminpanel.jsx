import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Navbar from "./Navbar";

const Addminpanel = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");

  const [show, setShow] = useState(2);
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

  const handlebutton = async (e) => {
  e.preventDefault();
  setImage(null);
  setName("");
  setPrice("");
  setDescription("");
  setDiscountedPrice("");
  setStock("");
  setRating("");
  setDiscount("");

  const formData = new FormData();
  formData.append("image", image); // File object
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("discountedPrice", discountedPrice);
  formData.append("stock", stock);
  formData.append("rating", rating);
  formData.append("discount", discount);

  console.log(formData);

  try {
    const API = import.meta.env.VITE_API_URL;
    const res = await axios.post(
      `${API}/products/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.status === 200) {
      showSnackbar("✅ Product created successfully");
    } else {
      showSnackbar("❌ Product creation failed");
    }
  } catch (error) {
    console.error(error);
    showSnackbar("❌ Error creating product");
  }
};


  return (
    <div>
      <Navbar logo={"Scatch"}/>
      <div className="flex w-full ">
        <div className="w-1/6 h-[33rem] border-r border-gray-300 py-8 font-[600] text-lg">
          <h1
            onClick={() => setShow(1)}
            className="hover:bg-gray-300 pl-5 cursor-pointer"
          >
            All Products
          </h1>
          <h1
            onClick={() => setShow(2)}
            className="hover:bg-gray-300 pl-5 cursor-pointer"
          >
            Create new product
          </h1>
        </div>
        <div className="w-5/6">
          {show === 1 && <div>All Products Content</div>}
          {show === 2 && (
            <div>
              <h1 className="text-xl font-bold ml-10">Create new product</h1>

              <div >
                <h1 className="text-lg font-[600] mt-2 ml-10">
                  Product details
                </h1>
                <div className="ml-10 mt-3">
                  <h3 className="flex">Image</h3>
                  <input
                    type="file"
                    className="ml-10"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product Price"
                    />
                  </div>
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={discountedPrice}
                      onChange={(e) => setDiscountedPrice(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product Discounted Price"
                    />
                  </div>
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product Stock"
                    />
                  </div>
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product rating"
                    />
                  </div>
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product Description"
                    />
                  </div>
                  <div className="w-70 mt-5 ml-10 ">
                    <input
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="border-gray-300 rounded border-1 w-full px-2 py-1 outline-none"
                      type="text"
                      placeholder="Product Discount"
                    />
                  </div>
                </div>
                <button
                  onClick={handlebutton}
                  className="w-27 ml-10 mt-10 h-10 bg-blue-500 text-white rounded-xl text-sm"
                >
                  Create Product
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Addminpanel;
