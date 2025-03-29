const mongoose = require('mongoose');

const LandingBannerSchema = mongoose.Schema({
  image: {type: String, required: true}
})

const LandingBanner = mongoose.model('LandingBanner', LandingBannerSchema)

module.exports = LandingBanner