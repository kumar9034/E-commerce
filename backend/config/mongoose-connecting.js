const mongoose = require('mongoose');


// Get Mongo URI from environment variable
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/e-commerce";

if (!mongoUri) {
  throw new Error("❌ MONGO_URI is not defined in environment variables");
}

// Connect to MongoDB
mongoose.connect(`${mongoUri}/e-commerce`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

module.exports = mongoose.connection;
