const express = require('express');
const { getWebinarAndPodcastStats, updateWebinarAndPodcastStats } = require('../controllers/webinarAndPodcastStatsController');

const router = express.Router();

router.get('/', getWebinarAndPodcastStats);
router.post('/', updateWebinarAndPodcastStats);

module.exports = router;
