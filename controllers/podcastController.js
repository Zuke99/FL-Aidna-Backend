const podcastService = require("../services/podcastService");

const createPodcast = async (req, res) => {
  try {
    const podcastData = req.body;
    const podcast = await podcastService.createPodcast(podcastData);
    return res.status(201).json({ message: "Podcast created successfully", podcast });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await podcastService.getAllPodcasts();
    return res.status(200).json(podcasts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getPodcastById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Podcast ID is required" });
    }

    const podcast = await podcastService.getPodcastById(id);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    return res.status(200).json(podcast);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePodcast = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Podcast ID is required" });
    }

    const podcastData = req.body;
    const updatedPodcast = await podcastService.updatePodcast(id, podcastData);

    if (!updatedPodcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    return res.status(200).json({ message: "Podcast updated successfully", updatedPodcast });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePodcast = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Podcast ID is required" });
    }

    const result = await podcastService.deletePodcast(id);

    if (!result) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    return res.status(200).json({ message: "Podcast deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPodcast,
  getAllPodcasts,
  getPodcastById,
  updatePodcast,
  deletePodcast,
};
