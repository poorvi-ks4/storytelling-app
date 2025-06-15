
const mongoose =require("mongoose")
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  ageGroup: { type: String, required: true },
  instructions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);