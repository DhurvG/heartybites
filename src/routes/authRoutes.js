// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register a new user
router.post("/signup", async (req, res) => {
  console.log("Received signup request with data:", req.body);
  const { name, email, password } = req.body;

  try {
    // Add validation
    if (!name || !email || !password) {
      console.log("Missing required fields");
      return res.status(400).json({ 
        message: "Please provide all required fields" 
      });
    }

    // Check if user exists
    console.log("Checking if user exists...");
    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ 
        message: "User already exists with this email" 
      });
    }

    // Create new user
    console.log("Creating new user...");
    try {
      user = new User({ name, email, password });
      console.log("User model created:", user);
      
      const savedUser = await user.save();
      console.log("User saved successfully:", savedUser);
    } catch (saveError) {
      console.error("Detailed save error:", saveError);
      return res.status(500).json({ 
        message: "Error creating user account",
        error: saveError.message 
      });
    }

    // Generate token
    const token = generateToken(user._id);
    console.log("Generated token for user");
    
    // Return success response
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
    
  } catch (error) {
    console.error("Detailed signup error:", error);
    res.status(500).json({ 
      message: "Server error during signup",
      error: error.message 
    });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
