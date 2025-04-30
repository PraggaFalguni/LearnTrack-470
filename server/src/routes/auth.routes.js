const express = require("express");
const { register, login, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const User = require("../models/user.model");

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
router.patch("/profile", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
