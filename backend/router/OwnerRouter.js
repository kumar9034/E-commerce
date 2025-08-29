const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const ownerModel = require("../models/Owner-models");
const orderModel = require("../models/Order-moduels");
const dowwnload = require('../controler/dowwnload');

if (process.env.NODE_ENV === 'development') {

    // Create Owner
    router.post('/create', async function (req, res) {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send("Owner already exists");
            }

            let { Fullname, email, password } = req.body;
            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        return res.status(500).send("Error hashing password");
                    }
                    const createOwner = await ownerModel.create({
                        Fullname,
                        email,
                        password: hash
                    });
                    res.status(201).json(createOwner);
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get all orders and assign to owner
    
}
router.get("/all-orders", async (req, res) => {
 try {
        const owner = await ownerModel.findOne(); // find first owner
        if (!owner) {
            return res.status(404).json({ message: "No owner found" });
        }

        // ✅ Fetch all orders
        const orders = await orderModel.find()
            .populate("user", "fullname email")
            .populate("product.id", "name price");

        // ✅ Update owner's order list
        owner.order = orders.map(order => order._id);

        res.json({
            message: "Orders fetched and saved to owner",
            orders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 router.get("/download", dowwnload)

module.exports = router;
