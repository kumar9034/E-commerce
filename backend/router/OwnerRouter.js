const express = require('express')
const router = express()
const ownerModel = require("../models/Owner-models")

if(process.env.NODE_ENV === 'development'){
    
    router.post('/create', async function(req, res){
        let owners = await ownerModel.find()
        if(owners.length > 0){
            return res.status(503).send("Owner already exists")
        }

        let { Fullname,email, password} = req.body
        const createOwner = await ownerModel.create({
            Fullname,
            email,
            password
        })
        res.status(201)
        .send(createOwner)
    })

}
router.get('/', function(req, res){
    res.send('Welcome to the Owner Router')
})




module.exports = router