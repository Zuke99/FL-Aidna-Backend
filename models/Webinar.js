const mongoose = require('mongoose');

const webinarSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  label: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
});

module.exports = mongoose.model('Webinar', webinarSchema);