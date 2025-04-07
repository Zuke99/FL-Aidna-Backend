const express = require("express");
const router = express.Router();
const { getExposBanner, uploadExposBanner } = require("../controllers/exposBannerController");

router.get("/", getExposBanner);
router.post("/", uploadExposBanner);

module.exports = router;
