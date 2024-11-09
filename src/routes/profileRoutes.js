// src/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/User");

// Get current user's profile
router.get("/", async (req, res) => {
  try {
    // req.user contains the user ID from the auth middleware
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profile = await Profile.findOne({ email: user.email });
    
    if (!profile) {
      // Create a basic profile if none exists
      profile = new Profile({
        email: user.email,
        name: user.name
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create or update profile
router.post("/", async (req, res) => {
  const { name, email, bio, favoriteRecipes } = req.body;

  try {
    let profile = await Profile.findOne({ email });

    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { email },
        { name, bio, favoriteRecipes },
        { new: true }
      );
    } else {
      // Create profile
      profile = new Profile({ name, email, bio, favoriteRecipes });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get profile by email
router.get("/:email", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email }).populate("favoriteRecipes");
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
