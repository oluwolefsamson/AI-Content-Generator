const express = require("express");
const connectDB = require("./Utils/db");
const cors = require("cors");
const contentRoutes = require("./routes/contentRoutes");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Configure CORS to allow requests from your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Dynamic Content Generator API");
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
