
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Order = require('../models/Order-moduels'); // aapka order model

module.exports = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('product'); // orders fetch

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=orders.pdf');

        doc.pipe(res);

        doc.fontSize(20).text('Orders List', { align: 'center' });
        doc.moveDown();

        orders.forEach((order, index) => {
            doc.fontSize(12).text(`${index + 1}. User: ${order.user.name}`);
            doc.text(`   Product: ${order.product.name}`);
            doc.text(`   Quantity: ${order.quantity}`);
            doc.text(`   Total Price: ₹${order.totalPrice}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).send('Error generating PDF');
    }
}
