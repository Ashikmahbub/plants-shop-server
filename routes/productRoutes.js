 
const express = require('express');
const multer = require('multer');
const { createProduct } = require('../service/productService'); // Import the service
const router = express.Router();

// Multer setup for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save the files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file
  },
});

const upload = multer({ storage: storage });

// POST /api/products - Add a product and save it to the 'plants' table
router.post('/products', upload.single('image'), async (req, res) => {
  const { title, category, weight, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const productData = {
      title,
      category,
      weight,
      price,
      imageUrl,
    };

    await createProduct(productData); // Use the service to create a product
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;

