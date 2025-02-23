const webinarService = require("../services/webinarService");

const createWebinar = async (req, res) => {
  try {
    const webinarData = req.body;
    const webinar = await webinarService.createWebinar(webinarData);
    return res.status(201).json({ message: "Webinar created successfully", webinar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllWebinars = async (req, res) => {
  try {
    const webinars = await webinarService.getAllWebinars();
    return res.status(200).json(webinars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getWebinarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Webinar ID is required" });
    }

    const webinar = await webinarService.getWebinarById(id);

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    return res.status(200).json(webinar);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Webinar ID is required" });
    }

    const webinarData = req.body;
    const updatedWebinar = await webinarService.updateWebinar(id, webinarData);

    if (!updatedWebinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    return res.status(200).json({ message: "Webinar updated successfully", updatedWebinar });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Webinar ID is required" });
    }

    const result = await webinarService.deleteWebinar(id);

    if (!result) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    return res.status(200).json({ message: "Webinar deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWebinar,
  getAllWebinars,
  getWebinarById,
  updateWebinar,
  deleteWebinar,
};
