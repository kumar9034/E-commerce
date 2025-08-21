const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    discountedPrice:{
        type: Number,
        required: true,
        min: 0,
    },
    description:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    image:{
        type: String,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
        min: 0,
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
    rating:{
        type: Number,
        required: true,
        min: 0,
        max: 5
    }

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)