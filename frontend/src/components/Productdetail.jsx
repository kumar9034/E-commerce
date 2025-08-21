// ProductDetail.jsx
import { useContext } from "react";
import { UserContext } from "./Contextapi";
import Navbar from "./Navbar";
import { IoCashOutline } from "react-icons/io5"
import { MdOutlinePublishedWithChanges } from "react-icons/md"
import { TbTruckDelivery } from "react-icons/tb"; 
import { GoTrophy } from "react-icons/go";

function ProductDetail() {
  const { product } = useContext(UserContext);

  if (!product) return <p>Loading...</p>;

  return (
    <div>

      <Navbar logo={"Sactch"} />
      <div className="w-full px-15 pt-10 flex ">
        <div className="w-[40%] ">
          <div className="h-95 ">
            <img className="object-contain  h-full" src={product.image} alt="" />
          </div>
          <div className="flex gap-5">
            <button className="text-white w-45 font-[700] text-lg mt-5 h-14 bg-[#ff9f00]">
              Add to cart
            </button>
            <button className="text-white w-45 font-[700] text-lg mt-5 h-14 bg-[#fb641b]">
              Buy now
            </button>
          </div>
        </div>
        <div className="w-[60%]">
          <div>
            <h1 className="text-xl font-[500] ">{product.name}</h1>
            <div className="w-14 h-8 px-2 py-1 bg-[#388e3c] text-sm rounded mt-3 text-white font-[800]">{product.rating} ★</div>
            <div className="text-sm font-[400] text-[#388e3c] mt-2">In stock: <span className="font-[600] text-black">{product.stock}</span></div>
            <h1 className="text-md font-[600] mt-4 text-[#388e3c]">Special price</h1>
            <div className="text-3xl font-[700] text-black">₹{product.discountedPrice}
              <span className="text-2xl font-[400] text-[#878787] ml-4 line-through">₹{product.price}</span>
              <span className="text-xl font-[600] text-[#388e3c] ml-4">{product.discount}% off</span>
            </div>
            <div className="h-37"></div>
            <div className="mt-10 flex gap-5">
              <h1 className=" text-center w-25 flex-col justify-center items-center">
                <IoCashOutline style={{ fontSize: "28px", marginLeft: "30px" }} />
                <p className="text-[#2162a1] text-sm font-[500]">
                  cash/pay on Delivery
                  </p>
              </h1>
              <h1 className=" text-center w-25 flex-col justify-center items-center">
                <MdOutlinePublishedWithChanges style={{ fontSize: "28px", marginLeft: "30px" }} />
                <p className="text-[#2162a1] text-sm font-[500]">
                  10 days replacement
                  </p>
              </h1>
              <h1 className=" text-center w-25 flex-col justify-center items-center">
                <TbTruckDelivery style={{ fontSize: "28px", marginLeft: "30px" }} />
                <p className="text-[#2162a1] text-sm font-[500] mt-4">
                  free delivery
                  </p>
              </h1>
              <h1 className=" text-center w-25 flex-col justify-center items-center">
                <GoTrophy style={{ fontSize: "28px", marginLeft: "30px" }} />
                <p className="text-[#2162a1] text-sm font-[500] mt-4">
                  Top Brand
                  </p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;






