const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

// Get all notes for the current user
router.get('/user', protect, async (req, res) => {
  try {
    console.log('Fetching notes for user:', req.user._id);
    const notes = await Note.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });
    
    console.log('Found notes:', notes);
    res.json({ notes });
  } catch (error) {
    console.error('Error fetching user notes:', error);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Get notes for a specific recipe
router.get('/:recipeId', protect, async (req, res) => {
  try {
    console.log('User from token:', req.user);
    console.log('Recipe ID:', req.params.recipeId);

    const notes = await Note.find({
      userId: req.user._id,
      recipeId: req.params.recipeId
    }).sort({ createdAt: -1 });
    
    console.log('Found notes:', notes);
    res.json({ notes });
  } catch (error) {
    console.error('Error in GET /notes/:recipeId:', error);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Create or update a note
router.post('/', protect, async (req, res) => {
  try {
    console.log('User from token:', req.user);
    console.log('Request body:', req.body);

    const { recipeId, content } = req.body;

    if (!recipeId || !content) {
      return res.status(400).json({ message: 'Recipe ID and content are required' });
    }

    // Find and update if exists, otherwise create new
    const note = await Note.findOneAndUpdate(
      { userId: req.user._id, recipeId },
      { content },
      { new: true, upsert: true }
    );

    console.log('Saved note:', note);
    res.json({ note });
  } catch (error) {
    console.error('Error in POST /notes:', error);
    res.status(500).json({ message: 'Error saving note' });
  }
});

// Add this new route for deleting a note
router.delete('/:noteId', protect, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.noteId,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note' });
  }
});

module.exports = router; 