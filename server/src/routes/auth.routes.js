const express = require("express");
const { register, login, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Request logging middleware
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, {
    body:
      req.method !== "GET"
        ? { ...req.body, password: "[REDACTED]" }
        : undefined,
    headers: req.headers,
  });
  next();
};

// Apply request logging to all routes
router.use(requestLogger);

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", protect, getMe);

module.exports = router;
