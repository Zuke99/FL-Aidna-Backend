const eventService = require("../services/eventService");

const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await eventService.createEvent(eventData);
    return res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const result = await eventService.getEventBySlug(slug);

    if (result.message === "Event not found") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const result = await eventService.deleteEvent(slug);

    if (result.message === "Event not found") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateEvent = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const eventData = req.body;
    const result = await eventService.updateEvent(slug, eventData);

    if (result.message === "Event not found") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventBySlug,
  deleteEvent,
  updateEvent
};
