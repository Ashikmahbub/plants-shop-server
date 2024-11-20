const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../config/dbConnection');   // Import the global db connection

// Function to create a new order
async function createUser(userData) {
  try {
    const db = await connectToDatabase();
     
    const collection = db.collection('users');

    const result = await collection.insertOne(userData);
    console.log('User inserted with ID:', result.insertedId);
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Function to fetch all orders
async function getAllUsers() {
  try {
    
    const db = await connectToDatabase();
     
    const collection = db.collection('users');

    return await collection.find().toArray();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Function to fetch an order by ID
async function getUserById(id) {
  try {
    const db = await connectToDatabase();
     
    const collection = db.collection('users');

    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Function to update an order by ID
async function updateUser(id, updatedData) {
  try {
    const db = await connectToDatabase();
     
    const collection = db.collection('users');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return result;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

// Function to update payment status
async function updatePaymentStatus(id, paymentStatus) {
  try {
    const db = await connectToDatabase();
     
    const collection = db.collection('orders');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { paymentStatus } }
    );

    return result;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}

// Function to update delivery status
async function updateDeliveryStatus(id, deliveryStatus) {
  try {
    const db = await connectToDatabase();
     
    const collection = db.collection('orders');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { deliveryStatus } }
    );

    return result;
  } catch (error) {
    console.error('Error updating delivery status:', error);
    throw error;
  }
}

// Function to delete an order by ID
async function deleteOrder(id) {
  try {
    const db = await connectToDatabase();
     
    const collection = db.collection('orders');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updatePaymentStatus,
  updateDeliveryStatus
};
