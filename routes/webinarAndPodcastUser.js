const express = require('express');
const { webinarAndPodcastUserController } = require('../controllers/webinarAndPodcastUserController');
const router = express.Router();

router.post('/', webinarAndPodcastUserController)

module.exports = router;  