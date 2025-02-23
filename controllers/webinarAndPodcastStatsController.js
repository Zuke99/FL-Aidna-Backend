const WebinarAndPodcastStats = require('../models/WebinarAndPodcastStats');

const updateWebinarAndPodcastStats = async (req, res) => {
  try {
    const newData = req.body;

    let stats = await WebinarAndPodcastStats.findOne();

    if (stats) {
      stats = await WebinarAndPodcastStats.findByIdAndUpdate(
        stats._id,
        { $set: newData },
        { new: true, upsert: true }
      );
      return res.status(200).json({ message: "Stats updated successfully", stats });
    }

    const newStats = new WebinarAndPodcastStats(newData);
    await newStats.save();
    
    res.status(201).json({ message: "New stats created successfully", stats: newStats });

  } catch (error) {
    console.error("Error updating stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWebinarAndPodcastStats = async (req, res) => {
  try {
    const stats = await WebinarAndPodcastStats.findOne();

    if (!stats) {
      return res.status(404).json({ message: "No stats found" });
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateWebinarAndPodcastStats, getWebinarAndPodcastStats };