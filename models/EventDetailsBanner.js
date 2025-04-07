const mongoose = require('mongoose');

const EventDetailsBannerSchema = mongoose.Schema({
  image: {type: String, required: false},
  videoUrl: {type: String, required: false},
  showVideo: {type: Boolean, required: false, default: false}
})

const EventDetailsBanner = mongoose.model('EventDetailsBanner', EventDetailsBannerSchema)

module.exports = EventDetailsBanner