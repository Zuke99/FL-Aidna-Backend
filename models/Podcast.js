const mongoose = require('mongoose');

const podcastSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  speaker: { type: String, required: true },
  uploadedBy: { type: String, required: true , default: 'Admin'},
  date: { type: String, required: true },
  category: { type: String, required: true },
  label: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
})

module.exports = mongoose.model('Podcast', podcastSchema);