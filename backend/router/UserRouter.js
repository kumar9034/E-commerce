const express = require('express')
const router = express()
const Signup = require('../controler/Signup')
const login = require('../controler/Login')
const isloggedIn= require('../middlewares/isLoggedin')    
const UserModels = require('../models/User-models')



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
})

module.exports = router