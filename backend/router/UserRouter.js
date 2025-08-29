const express = require('express')
const router = express()
const Signup = require('../controler/Signup')
const login = require('../controler/Login')
const isloggedIn= require('../middlewares/isLoggedin')    
const UserModels = require('../models/User-models')
const Useraddress = require('../controler/Useraddress')
const Emailorder = require('../controler/Emailorder')



router.get('/', function(req, res){
    res.send('Welcome to the user Router')
})

router.post('/signup', Signup )

router.post('/login', login )



router.get("/logout",(req, res)=>{
 res.clearCookie('token')
 res.status(200).json({ message: 'Logged out successfully' })
})

router.post("/contact-number", isloggedIn, async (req, res) => {
  const { mobile } = req.body;
  

  const user = await UserModels.findByIdAndUpdate(req.user.id, {mobile}, {new: true})
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'Contact information saved successfully', user });
  console.log(user)
}),
 
router.post("/address",isloggedIn, Useraddress)

router.get("/my-orders", isloggedIn, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModels.findById(userId).populate({"path": "order", options: { sort: { createdAt: -1 }, limit: 1 }});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "✅ User Orders fetched successfully",
      orders: user.order,
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-email', isloggedIn, Emailorder)


module.exports = router