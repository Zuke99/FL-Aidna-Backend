const Videos = require("../models/Videos");

// Fetch all videos
const getAllVideos = async () => {
  return await Videos.find({ priority: { $gte: 1, $lte: 3 } }).sort({ priority: 1 });
};

// Add a new video or update priority
const addVideo = async (title, info, priority, url) => {
    if (priority && (priority < 1 || priority > 3)) {
        throw new Error("Priority must be between 1 and 3");
    }

    if (priority) {
        // Reset the existing video's priority if the same priority exists
        await Videos.updateMany({ priority }, { $set: { priority: 0 } });
    }

    const video = new Videos({ title, info, url,  priority: priority || 0 });
    return await video.save();
};

module.exports = { getAllVideos, addVideo };
