const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const Video = require('../models/Video');
const Progress = require('../models/UserProgress');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const videos = await Video.find();

    if (req.user.role === 'child') {
      const videosWithProgress = await Promise.all(videos.map(async (video) => {
        const progress = await Progress.findOne({
          userId: req.user.id,
          videoId: video._id
        });

        return {
          ...video.toObject(),
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
      
      return res.json(videosWithProgress);
    }

    res.json(videos);
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Server error fetching videos' });
  }
});

router.post('/', authenticateToken, requireRole('parent'), async (req, res) => {
  try {
    const { title, description, duration, category, videoUrl, thumbnailUrl } = req.body;
    
    const video = new Video({
      title,
      description,
      duration,
      category,
      videoUrl,
      thumbnailUrl
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ error: 'Server error creating video' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Optional: return progress for child
    let progressData = null;
    if (req.user.role === 'child') {
      const progress = await Progress.findOne({
        userId: req.user.id,
        videoId: video._id
      });

      progressData = progress ? {
        completed: progress.completed,
        liked: progress.liked,
        progress: progress.progress
      } : {
        completed: false,
        liked: false,
        progress: 0
      };
    }

    res.json({
      ...video.toObject(),
      userProgress: progressData
    });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Server error fetching video' });
  }
});

module.exports = router;
