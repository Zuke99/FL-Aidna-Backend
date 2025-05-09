const mongoose = require('mongoose');

const LandingBannerSchema = mongoose.Schema({
  image: {type: String, required: false},
  videoUrl: {type: String, required: false},
  showVideo: {type: Boolean, required: false, default: false}
})

const LandingBanner = mongoose.model('LandingBanner', LandingBannerSchema)

module.exports = LandingBanner