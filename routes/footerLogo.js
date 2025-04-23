const express = require('express')
const { getFooterLogo, uploadFooterLogo } = require('../controllers/footerLogoController')
const router = express.Router()

router.get('/', getFooterLogo)
router.post('/', uploadFooterLogo)

module.exports = router