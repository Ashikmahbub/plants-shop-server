const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createOrder(orderData) {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('orders'); // Collection for storing orders

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

module.exports = { createOrder };
