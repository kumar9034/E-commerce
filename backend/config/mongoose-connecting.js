const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose'); // Namespace: development:mongoose

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
.then(() => dbgr("✅ MongoDB Connected"))
.catch(err => dbgr("❌ MongoDB Connection Error:", err));

module.exports = mongoose.connection;
