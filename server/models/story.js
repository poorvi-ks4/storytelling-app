const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  image :{type :String},
  duration: { type: String, required: true },
  rating: Number,
  plays: Number
  
  
});

module.exports = mongoose.model('Story', storySchema);