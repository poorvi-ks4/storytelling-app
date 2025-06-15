const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const Story = require('../models/story');
const Progress = require('../models/UserProgress');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const stories = await Story.find().populate('createdBy', 'username');

    if (req.user.role === 'child') {
      const storiesWithProgress = await Promise.all(stories.map(async (story) => {
        const progress = await Progress.findOne({
          userId: req.user.id,
          storyId: story._id
        });

        return {
          ...story.toObject(),
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

      return res.json(storiesWithProgress);
    }

    res.json(stories);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Server error fetching stories' });
  }
});

router.post('/', authenticateToken, requireRole('parent'), async (req, res) => {
  try {
    const { title, description, content, difficulty, duration, category, ageGroup } = req.body;

    const story = new Story({
      title,
      description,
      content,
      difficulty,
      duration,
      category,
      ageGroup,
      createdBy: req.user.id
    });

    await story.save();
    await story.populate('createdBy', 'username');

    res.status(201).json(story);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Server error creating story' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('createdBy', 'username');
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    let userProgress = null;
    if (req.user.role === 'child') {
      userProgress = await Progress.findOne({
        userId: req.user.id,
        storyId: story._id
      });
    }

    res.json({
      ...story.toObject(),
      userProgress: userProgress ? {
        completed: userProgress.completed,
        liked: userProgress.liked,
        progress: userProgress.progress
      } : null
    });
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ error: 'Server error fetching story' });
  }
});

module.exports = router;
