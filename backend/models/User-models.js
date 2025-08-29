const mongoose = require('mongoose');
const { type } = require('os');
const { ref } = require('process');

const usershema = new mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  order: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  mobile: {
    type: Number,
    minLength: 0,
    maxLength: 10,
  },
  picture: {
    type: String,
    default: 'https://res.cloudinary.com/dz1qj3x8h/image/upload/v1735686260/avatars/avatar-1.png'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  

})
module.exports = mongoose.model('User', usershema)