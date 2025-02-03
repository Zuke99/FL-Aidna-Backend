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

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.getEventById(eventId);
    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};
