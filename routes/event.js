const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router()

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);

module.exports = router;