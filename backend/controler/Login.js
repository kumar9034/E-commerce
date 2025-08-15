const UserModels = require("../models/User-models");
const bcrypt = require("bcrypt");
const { GenrateToken } = require("../util/token");

module.exports = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Check if email exists
        let user = await UserModels.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Compare password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Server error" });
            }

            if (!result) {
                return res.status(401).json({ success: false, message: "Invalid email or password" });
            }

            // Generate token
            let token = GenrateToken(user);
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).json({ success: true, message: "Login successful", token });
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
