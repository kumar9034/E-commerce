const userModel = require("../models/User-models");
const bcrypt = require("bcrypt");
const { GenrateToken } = require("../util/token");

module.exports = async (req, res) => {
  try {
    let { Fullname, email, password, contact } = req.body;

    if (!Fullname || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists, please login");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send("Error generating salt");

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).send("Error hashing password");

        const User = await userModel.create({
          Fullname,
          email,
          password: hash,
          contact: contact || null,
        });

        let token = GenrateToken(User);

        // Set cookie BEFORE sending response
        res.cookie("token", token, { httpOnly: true });

        // Send only once here
        return res.status(200).json({
          success: true,
          message: "User created successfully",
          user: User,
        });
      });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
