const JWT = require("jsonwebtoken")

const GenrateToken = (User)=>{
 return JWT.sign({email:User.email, id:User._id}, process.env.JWT_KEY)
}

module.exports.GenrateToken = GenrateToken