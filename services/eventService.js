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

const getEventBySlug = async (slug) => {
  try {
    const event = await Event.findOne({ slug }); 
    if (!event) {
      return { message: "Event not found" };
    }
    return event; 
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Internal server error");
  }
};

const deleteEvent = async (slug) => {
  try {
    const event = await Event.findOneAndDelete({ slug });
    if (!event) {
      return { message: "Event not found" };
    }
    return { message: "Event deleted successfully" };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventBySlug,
  deleteEvent
};
