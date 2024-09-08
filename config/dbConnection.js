const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

async function connectToDatabase() {
  try {
    if (!dbConnection) {
      await client.connect();
      console.log("Connected to MongoDB");
      dbConnection = client.db(process.env.DB_NAME); // Select the database
    }
    return dbConnection;  
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
