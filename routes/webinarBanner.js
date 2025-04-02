const express = require("express");
const router = express.Router();
const { getWebinarBanner, uploadWebinarBanner } = require("../controllers/webinarBannerController");

router.get("/", getWebinarBanner);
router.post("/", uploadWebinarBanner);

module.exports = router;
