const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Story = require('../models/story');
const Game = require('../models/Game.js');        // Make sure these models exist
const Video = require('../models/Video.js');      // and are correctly defined
const Progress = require('../models/UserProgress');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Update or create progress (for child)
router.post('/', authenticateToken, requireRole('child'), async (req, res) => {
  try {
    const { storyId, gameId, videoId, completed, liked, progress } = req.body;

    const filter = { userId: req.user.id };
    if (storyId) filter.storyId = storyId;
    if (gameId) filter.gameId = gameId;
    if (videoId) filter.videoId = videoId;

    const update = {
      completed: completed !== undefined ? completed : false,
      liked: liked !== undefined ? liked : false,
      progress: progress !== undefined ? progress : 0,
      completedAt: completed ? new Date() : null
    };

    const userProgress = await Progress.findOneAndUpdate(
      filter,
      update,
      { upsert: true, new: true }
    );

    res.json(userProgress);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Server error updating progress' });
  }
});

// Get child progress
router.get('/child', authenticateToken, requireRole('child'), async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id })
      .populate('storyId', 'title')
      .populate('gameId', 'title')
      .populate('videoId', 'title');

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error fetching progress' });
  }
});

// Parent dashboard stats
router.get('/dashboard', authenticateToken, requireRole('parent'), async (req, res) => {
  try {
    const totalStories = await Story.countDocuments();
    const totalGames = await Game.countDocuments();
    const totalVideos = await Video.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'child' });

    const recentProgress = await Progress.find()
      .populate('userId', 'username')
      .populate('storyId', 'title')
      .populate('gameId', 'title')
      .populate('videoId', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalStories,
      totalGames,
      totalVideos,
      totalUsers,
      recentProgress
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Server error fetching dashboard stats' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});



module.exports = router;
