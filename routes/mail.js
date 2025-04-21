const express = require("express");
const router = express.Router();
const { contactUsSubmission, subscribeToEventsSubmission, sponsorShipRequestSubmission, subscribeToNewsSubmission, subscribeToNewsletter } = require('../controllers/mailController')

router.post('/contact-us', contactUsSubmission);
router.post('/subscribe-to-events', subscribeToEventsSubmission)
router.post('/subscribe-to-news', subscribeToNewsSubmission)
router.post('/sponsorship-request', sponsorShipRequestSubmission)
router.post('/subscribe-to-newsletter', subscribeToNewsletter)

module.exports = router