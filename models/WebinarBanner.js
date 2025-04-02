const mongoose = require('mongoose');

const WebinarBannerSchema = mongoose.Schema({
  image: {type: String, required: false},
  videoUrl: {type: String, required: false},
  showVideo: {type: Boolean, required: false, default: false}
})

const WebinarBanner = mongoose.model('WebinarBanner', WebinarBannerSchema)

module.exports = WebinarBanner