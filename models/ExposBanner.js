const mongoose = require('mongoose');

const ExposBannerSchema = mongoose.Schema({
  image: {type: String, required: false},
  videoUrl: {type: String, required: false},
  showVideo: {type: Boolean, required: false, default: false}
})

const ExposBanner = mongoose.model('ExposBanner', ExposBannerSchema)

module.exports = ExposBanner