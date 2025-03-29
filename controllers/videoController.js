const videoService = require("../services/videoService");

const getVideos = async (req, res) => {
    try {
        const videos = await videoService.getAllVideos();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const uploadVideo = async (req, res) => {
    try {
        const { title, info, priority, url } = req.body;

        if (!title || !info) {
            return res.status(400).json({ message: "Title and Info are required" });
        }

        const video = await videoService.addVideo(title, info, priority, url);
        res.status(201).json({ message: "Video uploaded successfully", video });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getVideos, uploadVideo };
