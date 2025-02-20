const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router()

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:slug', eventController.getEventBySlug);
router.delete('/:slug', eventController.deleteEvent);
router.put('/:slug', eventController.updateEvent);

module.exports = router;