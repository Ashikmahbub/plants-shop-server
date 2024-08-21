import Product from '../models/productModel.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new product (admin only)
export const addProduct = async (req, res) => {
  const { name, price, description, imageUrl, category } = req.body;
  const product = new Product({ name, price, description, imageUrl, category });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product (admin only)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, imageUrl, category }, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product (admin only)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
