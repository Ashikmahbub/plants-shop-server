const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use("/api", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createProduct(productData) {
  try {
    await client.connect();
    const database = client.db("Plants-shop");
    const collection = database.collection("plants");

    const result = await collection.insertOne(productData);
    console.log("Product inserted with ID:", result.insertedId);
    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  } finally {
    await client.close();
  }
}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const productsCollection = client.db("Plants-shop").collection("plants");
    app.get("/api/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      console.log(result);

      res.send(result);
    });
    // Route to get indoor plants
    app.get("/api/products/indoor", async (req, res) => {
      try {
        const products = await productsCollection
          .find({ category: "Indoor" })
          .toArray();
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch indoor plants" });
      }
    });

    const reviewsCollection = client.db("bistroDB").collection("reviews");
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

module.exports = { createProduct };

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
