const express = require('express')
const router = express()
const Signup = require('../controler/Signup')
const login = require('../controler/Login')

router.get('/', function(req, res){
    res.send('Welcome to the user Router')
})

router.post('/signup', Signup )

router.post('/login', login )



router.get("/logout",(req, res)=>{
 res.clearCookie('token')
 res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = router