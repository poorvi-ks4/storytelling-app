
const mongoose =require("mongoose")
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);