
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

const categoryRoutes = require("./routes/categoryRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const authRoutes = require("./routes/authRoutes");
const userDestinationRoutes = require("./routes/userDestinationRoutes");
const adminDestinationRoutes = require("./routes/adminDestinationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API health check
app.get("/", (req, res) => {
  res.json({
    message: "Travel Destination API is running",
  });
});

// Database health check
app.get("/api/health/db", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT DATABASE() AS databaseName"
    );

    res.json({
      message: "MySQL connected successfully",
      database: rows[0].databaseName,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Public routes
app.use("/api/categories", categoryRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);

// Protected user route
app.use("/api/user/destinations", userDestinationRoutes);

// Protected admin routes
app.use("/api/admin/destinations", adminDestinationRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});