const express = require('express');
const multer = require('multer');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} = require('../service/productService'); // Import the service functions
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

// POST /api/admin/products - Add a product
router.post('/admin/products', upload.single('image'), async (req, res) => {
  const { title, category, weight, price } = req.body;
  const lowerCaseCategory = category.toLowerCase(); 
  
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  

  try {
    const productData = {
      title,
      category:lowerCaseCategory,
      weight,
      price,
      imageUrl
    };

    await createProduct(productData); // Use the service to create a product
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

 
router.put('/admin/products/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, category, weight, price } = req.body;
  const lowerCaseCategory = category.toLowerCase(); 

  try {
     
    const product = await getProductById(id);   

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
 
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : product.imageUrl;

    const updatedData = {
      title,
      category:lowerCaseCategory,
      weight,
      price,
      imageUrl,   
    };

    const result = await updateProduct(id, updatedData);

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Product updated successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});



// DELETE /api/admin/products/:id - Delete a product by ID
router.delete('/admin/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteProduct(id);

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Product deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// GET /api/admin/products - Get all products
router.get('/admin/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/admin/products/:id - Get a product by ID
router.get('/admin/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
