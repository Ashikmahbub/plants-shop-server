const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const productManagementRoutes = require("./routes/productManagementRoutes");
const getProductRoutes = require("./routes/getProductRoutes");
const createOrderRoutes = require("./routes/createOrderRoutes");
const salesRoutes = require("./routes/salesRoutes");
const manageOrderRoutes = require("./routes/manageOrdersRoutes");
const { connectToDatabase } = require("./config/dbConnection"); // Importing the dbConnection

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();  

// API routes
app.use("/api", productManagementRoutes);
app.use("/api", getProductRoutes);
app.use("/api", createOrderRoutes);
app.use("/api", salesRoutes);
app.use("/api", manageOrderRoutes);

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
