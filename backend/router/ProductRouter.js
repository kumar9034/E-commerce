const express = require('express')
const router = express()
const { upload, cloudinary }= require("../config/multer-config.js")
const productmodel = require('../models/Product-models')
const OwnerModels = require('../models/Owner-models.js')

router.post('/', upload.single("image"), async function(req, res){

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    try{
        let { name, price, description, discountedPrice, discount, stock, rating } = req.body
        

        let product = await productmodel.create({
            name,
            price,
            description,
            image: uploadResult.secure_url,
            discountedPrice,
            stock,
            rating,
            discount
        })
        const owner = await OwnerModels.findOne()
        product.owners = owner
        await product.save()

        res.status(200).send({ product, message: "Product created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Error creating product", error })
    }
    
})

router.get('/check', async function(req, res){
    res.status(200).send({ message: "Product router is working" })
})

module.exports = router