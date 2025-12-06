const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const Video = require('../models/Video');
const Progress = require('../models/UserProgress');

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();

    const formatted = videos.map(video => ({
      ...video.toObject(),
      _id: video._id.toString()
    }));

    console.log('Sending videos response:', formatted);
    res.json(formatted);
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Server error fetching videos' });
  }
});

/*router.get('/', async (req, res) => {
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
*/
router.post('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Just return the video as a plain object
    res.json(video.toObject());
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Server error fetching video' });
  }
});

module.exports = router;
