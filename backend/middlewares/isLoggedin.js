// Middleware
const jwt = require("jsonwebtoken");

function isLoggedin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
  if (err && err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired",});
  }else{
    req.user = user;
    next();
  }
});

}

module.exports = isLoggedin;
