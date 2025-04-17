const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    console.log("Registration request received:", {
      body: { ...req.body, password: "[REDACTED]" },
      headers: req.headers,
    });

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.log("Registration failed: Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Registration failed: User already exists", { email });
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = signToken(user._id);

    console.log("Registration successful:", {
      userId: user._id,
      email: user.email,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Log the incoming request (excluding password for security)
    console.log("Login request received:", {
      body: { ...req.body, password: "[REDACTED]" },
      headers: req.headers,
    });

    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      console.log("Login failed: Missing email or password");
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find user by email
    console.log("Searching for user with email:", email);
    const user = await User.findOne({ email }).select("+password");
    console.log(
      "User found:",
      user ? { id: user._id, email: user.email } : "Not found"
    );

    if (!user) {
      console.log("Login failed: User not found", { email });
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    console.log("Verifying password...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Login failed: Invalid password", { email });
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    console.log("Generating token...");
    const token = signToken(user._id);
    console.log("Token generated successfully");

    // Prepare user data for response (excluding sensitive info)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
    };

    console.log("Login successful:", { userId: user._id, email: user.email });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    console.log("Get current user request received:", {
      userId: req.user.id,
      headers: req.headers,
    });

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      console.log("Get current user failed: User not found", {
        userId: req.user.id,
      });
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Get current user successful:", { userId: user._id });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
