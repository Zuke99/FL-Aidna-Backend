const express = require("express");
const router = express.Router();
const { contactUsSubmission, subscribeToEventsSubmission, sponsorShipRequestSubmission } = require('../controllers/mailController')

router.post('/contact-us', contactUsSubmission);
router.post('/subscribe-to-events', subscribeToEventsSubmission)
router.post('/sponsorship-request', sponsorShipRequestSubmission)

module.exports = router