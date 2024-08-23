const express = require('express');
const nodemailer = require('nodemailer');
const { createOrder } = require('../service/orderService'); // Import the service
const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// POST /api/orders - Add an order and save it to the 'orders' table
router.post('/checkout', async (req, res) => {
  const { name, email, phone, address, city, country, cart } = req.body;

  try {
    const orderData = {
      name,
      email,
      phone,
      address,
      city,
      country,
      cart,
      createdAt: new Date(),
    };

    const result = await createOrder(orderData); // Use the service to create an order

    // Send email confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation - PlantShop',
      text: `Dear ${name},\n\nThank you for your order! Here are the details:\n\nOrder ID: ${result.insertedId}\nTotal Items: ${cart.length}\n\nShipping Address:\n${address}, ${city}, ${country}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nPlantShop Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Order placed successfully!', orderId: result.insertedId });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
