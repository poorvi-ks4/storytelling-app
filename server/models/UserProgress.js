
const mongoose =require("mongoose")
const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  completed: { type: Boolean, default: false },
  liked: { type: Boolean, default: false },
  progress: { type: Number, default: 0 }, // Percentage
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);