const { otpStore } = require('../config/OTPstore')

module.exports = (req, res) => {

  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email]; // ✅ OTP used once only
    return res.status(200).send({ message: "✅ Email verified successfully" });
  }

  res.status(400).json({ message: "❌ Invalid or expired OTP" });
};
