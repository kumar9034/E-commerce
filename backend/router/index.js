const express = require("express")
const isLoggedin = require("../middlewares/isLoggedin")
const router = express.Router()
const Productmodel = require("../models/Product-models")
const UserModels = require("../models/User-models")
const ProductModels = require("../models/Product-models")

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
router.get("/addtocart/:productid", isLoggedin , async (req, res)=>{
 const user = await  UserModels.findOne({email: req.user.email })
 
   user.cart.push(req.params.productid)
  const users =  await user.save()
   res.status(200).send({message: "Product added to cart successfully", cart: users.cart,})

})
router.put("/removeitem/:productid", isLoggedin, async (req, res)=>{
  const { productid } = req.params
 const user = await UserModels.findOne({email: req.user.email})
 user.cart = user.cart.filter(item => item.toString() !== productid)
 await user.save()
 res.status(200).send({message: "Product removed from cart successfully", cart: user.cart})
} )
router.get("/getcart", isLoggedin, async (req, res)=>{
  const user = await UserModels.findOne({email: req.user.email})
   const products = await Productmodel.find({_id: { $in: user.cart }})
   res.status(200).send(products)
})

router.get("/detail/:Productid", isLoggedin, async (req, res)=>{
  const productid = req.params.Productid
  const product = await Productmodel.findOne({_id: productid})
  res.status(200).send(product)
} )


module.exports = router