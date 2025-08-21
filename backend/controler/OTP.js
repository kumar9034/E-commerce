const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const verify = require("./verify");
const { otpStore } = require("../config/OTPstore");

// Temporary OTP storage
 // { email: otp }

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail ID
    pass: process.env.EMAIL_PASS, // 16-digit App Password
  },
});

// Send OTP Route
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body; // frontend se email aayega

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP

    // Save OTP
    otpStore[email] = otp;

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).send({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Error sending OTP", error: err.message });
  }
});

router.post("/verify-otp", verify)

module.exports = router;
