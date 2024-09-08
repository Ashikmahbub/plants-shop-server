const express = require('express');
const { getAllProducts, getProductsByCategory } = require('../service/productService');  
const router = express.Router();

// GET /api/products - Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:category - Get products by category
router.get('/products/:category', async (req, res) => {
  const { category } = req.params;
  console.log(category);
  

  try {
    const products = await getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: `Failed to fetch products in category: ${category}` });
  }
});

module.exports = router;
