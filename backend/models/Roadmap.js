const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,   // one roadmap per user
  },
  data: {
    type: mongoose.Schema.Types.Mixed,   // stores the full Gemini JSON
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
