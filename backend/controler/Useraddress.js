const orderModuels = require("../models/Order-moduels");
const OwnerModels = require("../models/Owner-models");
const Productmodel = require("../models/Product-models");
const UserModels = require("../models/User-models");

module.exports = async (req, res) => {
  try {
    const user = req.user.id;

    const { id, fullname, phone_no, state, village, city, country, pincode, house_no } = req.body;
    const product = await Productmodel.findById(id);


    const order = await orderModuels.create({
      user,
      fullname,
      phone_no,
      product :[{
        id: product._id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image
      }],
      address: [
        {
          state,
          village,
          city,
          country,
          pincode,
          house_no,
        },
      ],
    });
   const owner= await OwnerModels.findOne()
   owner.order.push(order._id);
   await owner.save();

    const userid = await UserModels.findById(user)
    userid.order.push(order._id);
    const users = await userid.save();
  

    res.status(200).json({ message: "Address updated successfully", order, users });
  } catch (error) {
    console.error("❌ Order creation error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
