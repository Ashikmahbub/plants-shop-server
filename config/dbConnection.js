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
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      dbConnection = client.db("Plants-shop");  
    }
    return dbConnection;  
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}


module.exports = { connectToDatabase };
