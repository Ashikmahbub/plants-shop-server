const express = require('express');
const { createOrder } = require('../service/orderService');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { name, email, phone, address, city, country, cart,shippingCharge comments, expectedDeliveryDate, giftNote, } = req.body;
  console.log(name, email, phone, address, city, country, comments, expectedDeliveryDate, giftNote);

  try {
    // Calculate the total order price
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Generate a unique order code
    const orderCode = `AS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderTotal = cartTotal+shippingCharge;

    // Define a default status for new orders
    const orderStatus = 'Pending'; // Example status, you can change it to whatever is appropriate

    const orderData = {
      name,
      email,
      phone,
      address,
      city,
      country,
      cart,
      orderCode,
      orderTotal,   
      orderStatus,  
      comments,  
      expectedDeliveryDate,  
      giftNote,  
      createdAt: new Date(),
    };

    // Create the order
    const result = await createOrder(orderData);

    // Set up email transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation - Thank You for Your Purchase!',
      text: `Dear ${name},\n\nThank you for your order!\nYour order code is ${orderCode}.\nTotal Amount: $${cartTotal}\n\nYour items will be shipped to:\n${address}, ${city}, ${country}\n\nOrder Status: ${orderStatus}\nComments: ${comments}\nExpected Delivery Date: ${expectedDeliveryDate}\nGift Note: ${giftNote}\n\nThank you for shopping with us!\n\nBest regards,\nYour Shop`,
    };

    // Send confirmation email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
         
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Order placed successfully!', orderCode, orderId: result.insertedId });
    console.log(orderCode);

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
