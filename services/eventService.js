const Event = require('../models/Event');

const createEvent = async (eventData) => {
  try {
    const event = new Event(eventData);
    await event.save();
    return event;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getAllEvents = async () => {
  try {
    const events = await Event.find().populate('creator', 'userName email image totalFollowers');
    return events;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId).populate('creator', 'userName email image totalFollowers')
    return event;
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById
}