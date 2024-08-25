const { connectToDatabase } = require('../config/dbConnection'); // Import your MongoDB connection

// Function to create a new product
async function createProduct(productData) {
  const db = await connectToDatabase();
  const productsCollection = db.collection('plants');
  await productsCollection.insertOne(productData);
}

// Function to fetch all products
async function getAllProducts() {
  const db = await connectToDatabase();
  const productsCollection = db.collection('plants');
  return await productsCollection.find().toArray();
}

// Function to fetch products by category
async function getProductsByCategory(category) {
  const db = await connectToDatabase();
  const productsCollection = db.collection('plants');
  return await productsCollection.find({ category }).toArray();
}

// Function to update a product by ID
async function updateProduct(id, updatedData) {
  const db = await connectToDatabase();
  const productsCollection = db.collection('plants');
  return await productsCollection.updateOne(
    { _id: new require('mongodb').ObjectId(id) },
    { $set: updatedData }
  );
}

// Function to delete a product by ID
async function deleteProduct(id) {
  const db = await connectToDatabase();
  const productsCollection = db.collection('plants');
  return await productsCollection.deleteOne({ _id: new require('mongodb').ObjectId(id) });
}

// Function to fetch a product by ID
async function getProductById(id) {
  const db = await connectToDatabase();
  const productsCollection = db.collection('plants');
  return await productsCollection.findOne({ _id: new require('mongodb').ObjectId(id) });
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  getProductById
};
