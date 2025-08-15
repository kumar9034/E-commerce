const express = require("express")
const isLoggedin = require("../middlewares/isLoggedin")
const router = express.Router()
const Productmodel = require("../models/Product-models")
const UserModels = require("../models/User-models")

// router.get("/", (req, res)=>{
//     res.send("Welcome to the index Router")
// })

router.get("/", isLoggedin, (req, res)=>{
   res.send("Welcome to the shop Router")
})
router.get("/shop", isLoggedin,  async (req, res)=>{
  let product = await  Productmodel.find()
  res.send(product)
})
router.get("/addtocart/:productid",  async (req, res)=>{
 const user = await  UserModels.findOne({email: req.user.email})
   user.cart.push(req.params.productid)
  const users =  await user.save()
   res.status(200).send({message: "Product added to cart successfully", cart: users.cart})

})



module.exports = router