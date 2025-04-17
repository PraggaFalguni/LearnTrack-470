const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const User = require("../models/user.model");

const router = express.Router();

// Get user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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

// Update user profile
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

// Get user's enrolled courses
router.get("/courses", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("enrolledCourses")
      .select("enrolledCourses");

    res.status(200).json({
      status: "success",
      data: {
        courses: user.enrolledCourses,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
