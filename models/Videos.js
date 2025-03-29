const mongoose = require('mongoose');

const VideosSchema = mongoose.Schema({
  title: {type: String, required: true},
  priority: { type: Number, required: false, default: 0 },
  info: {type: String, required: true},
  url: {type: String, required: true},
})

const Videos = mongoose.model('Videos', VideosSchema)

module.exports = Videos