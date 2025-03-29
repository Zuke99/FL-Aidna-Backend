const express = require("express");
const router = express.Router();
const { getLandingBanner, uploadLandingBanner } = require("../controllers/landingBannerController");

router.get("/", getLandingBanner);
router.post("/", uploadLandingBanner);

module.exports = router;
