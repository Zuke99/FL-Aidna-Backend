const Podcast = require("../models/Podcast");

const createPodcast = async (podcastData) => {
  try {
    const podcast = new Podcast(podcastData);
    await podcast.save();
    return podcast;
  } catch (error) {
    throw new Error("Error creating podcast: " + error.message);
  }
};

const getAllPodcasts = async () => {
  try {
    return await Podcast.find();
  } catch (error) {
    throw new Error("Error fetching podcasts: " + error.message);
  }
};

const getPodcastById = async (id) => {
  try {
    return await Podcast.findById(id);
  } catch (error) {
    throw new Error("Error fetching podcast: " + error.message);
  }
};

const updatePodcast = async (id, podcastData) => {
  try {
    const updatedPodcast = await Podcast.findByIdAndUpdate(id, podcastData, { new: true });
    return updatedPodcast;
  } catch (error) {
    throw new Error("Error updating podcast: " + error.message);
  }
};

const deletePodcast = async (id) => {
  try {
    const deletedPodcast = await Podcast.findByIdAndDelete(id);
    return deletedPodcast;
  } catch (error) {
    throw new Error("Error deleting podcast: " + error.message);
  }
};

module.exports = {
  createPodcast,
  getAllPodcasts,
  getPodcastById,
  updatePodcast,
  deletePodcast,
};
