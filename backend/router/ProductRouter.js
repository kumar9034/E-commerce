const express = require('express')
const router = express()
const { upload }= require("../config/multer-config")
const productmodel = require('../models/Product-models')

router.post('/', upload.single("image"), async function(req, res){
    try{
        let { name, price, description } = req.body
        
        let product = await productmodel.create({
            name,
            price,
            description,
            image: req.file.path,
        })
        
        res.status(200).send({ product, message: "Product created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Error creating product", error })
    }
    
})


module.exports = router