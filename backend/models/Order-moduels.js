const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  address: [
    {
      village: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String },
      house_no: { type: String }
    }
  ],
  product:[{
    id: { type: mongoose.Schema.Types.ObjectId,
     ref: "Product",
     required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
