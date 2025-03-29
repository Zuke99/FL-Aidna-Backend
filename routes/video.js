const express = require("express");
const router = express.Router();
const { getVideos, uploadVideo } = require("../controllers/videoController");

router.get("/", getVideos);
router.post("/", uploadVideo);

module.exports = router;
