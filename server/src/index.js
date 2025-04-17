const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const courseRoutes = require("./routes/course.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // API routes with /api prefix
    const apiRouter = express.Router();
    app.use("/api", apiRouter);

    // Mount routes on the /api router
    apiRouter.use("/auth", authRoutes);
    apiRouter.use("/tasks", taskRoutes);
    apiRouter.use("/courses", courseRoutes);

    // Add a catch-all route for undefined endpoints
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error("Error:", err);
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
