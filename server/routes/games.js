const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Game = require('../models/Game');              // ✅ Import Game model
const Progress = require('../models/UserProgress'); 
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();
router.get('/', authenticateToken, async (req, res) => {
  try {
    const games = await Game.find();
    
    if (req.user.role === 'child') {
      const gamesWithProgress = await Promise.all(games.map(async (game) => {
        const progress = await Progress.findOne({
          userId: req.user.id,
          gameId: game._id
        });
        
        return {
          ...game.toObject(),
          progress: progress ? {
            completed: progress.completed,
            liked: progress.liked,
            progress: progress.progress
          } : {
            completed: false,
            liked: false,
            progress: 0
          }
        };
      }));
      
      return res.json(gamesWithProgress);
    }
    
    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ error: 'Server error fetching games' });
  }
});

router.post('/', authenticateToken, requireRole('parent'), async (req, res) => {
  try {
    const { title, description, type, ageGroup, instructions } = req.body;
    
    const game = new Game({
      title,
      description,
      type,
      ageGroup,
      instructions
    });

    await game.save();
    res.status(201).json(game);
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ error: 'Server error creating game' });
  }
});
module.exports = router;