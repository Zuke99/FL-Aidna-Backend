const mongoose = require('mongoose');

const NewsBannerSchema = mongoose.Schema({
  image: {type: String, required: false},
  videoUrl: {type: String, required: false},
  showVideo: {type: Boolean, required: false, default: false}
})

const NewsBanner = mongoose.model('NewsBanner', NewsBannerSchema)

module.exports = NewsBanner