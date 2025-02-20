const Event = require("../models/Event");

const createEvent = async (eventData) => {
  try {
    const { section, priority } = eventData;
    const existingEvent = await Event.findOne({ section, priority });

    if (existingEvent) {
      await Event.updateOne({ _id: existingEvent._id }, { priority: 0 });
    }

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

const updateEvent = async (slug, eventData) => {  
  try {
    const event = await Event.findOne({ slug });
    if (!event) {
      return { message: "Event not found" };
    }

    const { section, priority } = eventData;

    const existingEvent = await Event.findOne({ section, priority });

    if (existingEvent && existingEvent._id.toString() !== event._id.toString()) {
      await Event.findByIdAndUpdate(existingEvent._id, { priority: 0 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { $set: eventData },
      { new: true }
    );

    return { message: "Event updated successfully", updatedEvent };
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventBySlug,
  deleteEvent,
  updateEvent
};
