const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to create a new order
async function createOrder(orderData) {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('orders');

    const result = await collection.insertOne(orderData);
    console.log('Order inserted with ID:', result.insertedId);
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Function to fetch all orders
async function getAllOrders() {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('orders');

    return await collection.find().toArray();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Function to fetch an order by ID
async function getOrderById(id) {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('orders');

    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Function to update an order by ID
async function updateOrder(id, updatedData) {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('orders');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return result;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Function to delete an order by ID
async function deleteOrder(id) {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('orders');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
