const UserModels = require("../models/User-models");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Gmail ID
        pass: process.env.EMAIL_PASS, // 16-digit App Password
    },
});

module.exports = async (req, res) => {
    const user = req.user.id
    const email = await UserModels.findById(user).select("email")
    const order = await UserModels.findById(user).populate({ "path": "order", options: { sort: { createdAt: -1 }, limit: 1 } });


    const { fullname, address, product } = order.order[0];
    const htmlcontain = `
          <h2>Thank you for your order, ${fullname}!</h2>
      <p>Your order has been placed successfully. Here are the details:</p>
      
      <h3>Products:</h3>
      <ul>
        ${product
            .map(
                (p) => `
          <li>
            <strong>${p.name}</strong> 
             <strong>price</strong>:₹${p.price}
            ${p.image ? `<br/><img src="${p.image}" width="100"/>` : ""}
          </li>
        `
            )
            .join("")}
      </ul>

      <h3>Shipping Address:</h3>
      <p>
        ${address[0].house_no}, ${address[0].village}, ${address[0].city}, ${address[0].state}, ${address[0].country} - ${address[0].pincode}
      </p>
      <br/>
      <p>We will notify you once your order is shipped.</p>
    `

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Order Confirmation",
        text: `Your order has been placed successfully.`,
        html: htmlcontain
    })




}
