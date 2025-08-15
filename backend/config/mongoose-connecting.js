const mongoose = require('mongoose');
const config = require('config'); // Load configuration
const dbgr = require('debug')('development:mongoose'); // Namespace: app:mongoose

mongoose.connect(`${config.get('MONGO_URI')}/e-commerce`)
.then(() => dbgr("✅ MongoDB Connected"))
.catch(err => dbgr("❌ MongoDB Connection Error:", err));

module.exports = mongoose.connection;
 