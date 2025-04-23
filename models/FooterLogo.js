const mongoose = require('mongoose');

const FooterLogoSchema = mongoose.Schema({
  image: {type: String, required: false},
})

const FooterLogo = mongoose.model('FooterLogo', FooterLogoSchema)

module.exports = FooterLogo