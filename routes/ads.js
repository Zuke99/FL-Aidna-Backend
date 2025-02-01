const express = require('express');
const adsController = require('../controllers/adsController');

const router = express.Router();

// Route for creating advertisements
router.post('/', adsController.manageAds);
router.get('/', adsController.getAds)

module.exports = router;
