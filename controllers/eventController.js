const eventService = require('../services/eventService');

const createEvent = async (req, res) => {
  try {
    const data = req.body;
    // TODO update during linking with auth
    const creator = '678755055bab4621449693a0';

    const event = await eventService.createEvent({...data, creator})
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById
}