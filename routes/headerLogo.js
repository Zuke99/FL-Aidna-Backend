const express = require('express')
const { getHeaderLogo, uploadHeaderLogo } = require('../controllers/headerLogoController')
const router = express.Router()

router.get('/', getHeaderLogo)
router.post('/', uploadHeaderLogo)

module.exports = router