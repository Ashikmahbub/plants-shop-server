const { connectToDatabase } = require('../config/dbConnection');  
const { ObjectId } = require('mongodb');  
// Function to create a new product
async function createProduct(productData) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');
    await productsCollection.insertOne(productData);
    console.log("Product created successfully");
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

// Function to fetch all products
async function getAllProducts() {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');
    console.log("Retrieving products from the plants table");
    return await productsCollection.find().toArray();
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Failed to fetch products');
  }
}

// Function to fetch products by category
async function getProductsByCategory(category) {
  try {
    console.log(`Fetching products for category: ${category}`);
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');
    console.log(category);
    
    return await productsCollection.find({ category }).toArray();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
}

// Function to update a product by ID
async function updateProduct(id, updatedData) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');
    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    if (result.matchedCount === 0) {
      throw new Error('Product not found');
    }
    console.log(`Product with ID ${id} updated successfully`);
    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

// Function to delete a product by ID
async function deleteProduct(id) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');
    const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }
    console.log(`Product with ID ${id} deleted successfully`);
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

// Function to fetch a product by ID
async function getProductById(id) {
  try {
    const db = await connectToDatabase();
    const productsCollection = db.collection('plants');
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product');
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductById
};
