const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const Story = require('../models/story');

const router = express.Router();

// GET all stories (for any authenticated user)
/*router.get('/', authenticateToken, async (req, res) => {
  try {
    const stories = await Story.find();
    const formatted = stories.map(story => ({
  ...story.toObject(),
  _id: story._id.toString()
}));
    res.json(formatted);
   console.log('Sending stories response:', formatted);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Server error fetching stories' });
  }
});
*/
// router.get('/', authenticateToken, async (req, res) => {
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    const formatted = stories.map(story => ({
      ...story.toObject(),
      _id: story._id.toString()
    }));
    console.log('Sending stories response:', formatted);
    res.json(formatted);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Server error fetching stories' });
  }
});

// POST a new story (only for parent users)
router.post('/', requireRole('parent'), async (req, res) => {
  try {
    const { title, description, content, image, duration, rating, plays } = req.body;

    const story = new Story({
      title,
      description,
      content,
      image,
      duration,
      rating,
      plays
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Server error creating story' });
  }
});

// GET a story by ID (for any authenticated user)
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ error: 'Server error fetching story' });
  }
});

module.exports = router;
