const express = require("express");
const router = express.Router();
const { getNewsBanner, uploadNewsBanner } = require("../controllers/newsBannerController");

router.get("/", getNewsBanner);
router.post("/", uploadNewsBanner);

module.exports = router;
