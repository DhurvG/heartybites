const express = require('express');
const router = express.Router();
const SavedRecipe = require('../models/SavedRecipe');
const { protect } = require('../middleware/authMiddleware');

// Check if a recipe is saved
router.get('/saved/:recipeId', protect, async (req, res) => {
  try {
    const savedRecipe = await SavedRecipe.findOne({
      userId: req.user._id,
      recipeId: req.params.recipeId
    });
    
    res.json({ isSaved: !!savedRecipe });
  } catch (error) {
    console.error('Error checking saved recipe:', error);
    res.status(500).json({ message: 'Error checking saved recipe' });
  }
});

// Save a recipe
router.post('/save', protect, async (req, res) => {
  try {
    const { recipeId } = req.body;
    
    const savedRecipe = await SavedRecipe.create({
      userId: req.user._id,
      recipeId
    });

    res.json({ savedRecipe });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ message: 'Error saving recipe' });
  }
});

// Unsave a recipe
router.delete('/save/:recipeId', protect, async (req, res) => {
  try {
    await SavedRecipe.findOneAndDelete({
      userId: req.user._id,
      recipeId: req.params.recipeId
    });

    res.json({ message: 'Recipe unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving recipe:', error);
    res.status(500).json({ message: 'Error unsaving recipe' });
  }
});

// Add this new route to get all saved recipes for a user
router.get('/saved', protect, async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find({
      userId: req.user._id
    }).sort({ savedAt: -1 });
    
    res.json({ savedRecipes });
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    res.status(500).json({ message: 'Error fetching saved recipes' });
  }
});

module.exports = router; 