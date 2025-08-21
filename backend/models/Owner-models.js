const mongoose = require('mongoose');
const { type } = require('os');
const { ref } = require('process');

const Ownershema = new mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
    password: {
        type: String,
        required: true,
        
    },

    Products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    picture:{
        type: String,
        // default: 'https://res.cloudinary.com/dz1qj3x8h/image/upload/v1735686260/avatars/avatar-1.png'
    }

})
module.exports = mongoose.model('Owner', Ownershema)