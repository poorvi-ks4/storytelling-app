const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/storytelling';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🌟 Mount routes with try/catch to catch the crash
try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Loaded auth routes');
} catch (err) {
  console.error('❌ Error in auth routes:', err.message);
}

try {
  const storyRoutes = require('./routes/story');
  app.use('/api/stories', storyRoutes);
  console.log('✅ Loaded story routes');
} catch (err) {
  console.error('❌ Error in story routes:', err.message);
}

try {
  const videoRoutes = require('./routes/video');
  app.use('/api/videos', videoRoutes);
  console.log('✅ Loaded video routes');
} catch (err) {
  console.error('❌ Error in video routes:', err.message);
}

try {
  const gameRoutes = require('./routes/games');
  app.use('/api/games', gameRoutes);
  console.log('✅ Loaded game routes');
} catch (err) {
  console.error('❌ Error in game routes:', err.message);
}

try {
  const progressRoutes = require('./routes/progress');
  app.use('/api/progress', progressRoutes);
  console.log('✅ Loaded progress routes');
} catch (err) {
  console.error('❌ Error in progress routes:', err.message);
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
