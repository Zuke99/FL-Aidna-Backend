const mongoose = require('mongoose');

const HeaderLogoSchema = mongoose.Schema({
  image: {type: String, required: false},
})

const HeaderLogo = mongoose.model('HeaderLogo', HeaderLogoSchema)

module.exports = HeaderLogo