const { MongoClient } = require('mongodb');

const uri =process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createProduct(productData) {
  try {
    await client.connect();
    const database = client.db('Plants-shop');
    const collection = database.collection('plants');  

    const result = await collection.insertOne(productData);
    console.log('Product inserted with ID:', result.insertedId);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;  
  } finally {
    await client.close();
  }
}

module.exports = { createProduct };