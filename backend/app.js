const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const expressSession = require('express-session'); 
const flash = require('connect-flash');
const cors = require('cors');


const db = require('./config/mongoose-connecting.js');
const ownerRouter = require('./router/OwnerRouter.js');
const userRouter = require('./router/UserRouter.js');
const productRouter = require('./router/ProductRouter.js');
const index = require('./router/index.js');
const OTP = require('./controler/OTP.js');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))
app.use(expressSession({
  resave:false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || "your_secret_key"
}))
app.use(flash());  
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // agar tum React Vite use kar rahe ho
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/owners", ownerRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/dashboard", index)
app.use("/OTP", OTP)


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})