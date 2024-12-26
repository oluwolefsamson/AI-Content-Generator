require("dotenv").config();
const express = require("express");
const connectDB = require("./Utils/db");
const contentRoutes = require("./routes/contentRoutes");

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api/content", contentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
