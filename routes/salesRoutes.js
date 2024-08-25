const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../config/dbConnection'); // Import the connection function
const { ObjectId } = require('mongodb');

 
router.get('/sales-statistics', async (req, res) => {
  try {
    const db = await connectToDatabase();  
    const ordersCollection = db.collection('orders');

     
    const salesData = await ordersCollection.aggregate([
      {
        $group: {
          _id: { month: { $month: "$orderDate" } },
          totalSales: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 }, // Sort by month
      },
    ]).toArray();

    res.json(salesData);
  } catch (err) {
    console.error("Error fetching sales statistics:", err);
    res.status(500).json({ error: "Failed to fetch sales statistics" });
  }
});

module.exports = router;
