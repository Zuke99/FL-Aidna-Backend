const Event = require("../models/Event");

const createEvent = async (eventData) => {
  try {
    const event = new Event(eventData);
    await event.save();
    return event;
  } catch (error) {
    throw new Error("Error creating event: " + error.message);
  }
};

const getAllEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw new Error("Error fetching events: " + error.message);
  }
};

const getEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) throw new Error("Event not found");
    return event;
  } catch (error) {
    throw new Error("Error fetching event: " + error.message);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};
