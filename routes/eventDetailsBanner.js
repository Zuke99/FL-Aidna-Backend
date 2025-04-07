const express = require("express");
const router = express.Router();
const { getEventDetailsBanner, uploadEventDetailsBanner } = require("../controllers/eventDetailsBannerController");

router.get("/", getEventDetailsBanner);
router.post("/", uploadEventDetailsBanner);

module.exports = router;
