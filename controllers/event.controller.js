const { Event } = require("../models/event.model");

const getEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const events = await Event.findById( eventId );
    res.send(events);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const getEvents = async (req, res) => {
  try {
    const event = await Event.find();
    res.send(event);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const getUserEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    res.send(event);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const eventUpdate = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const event = await Event.findOneAndUpdate(id, body, { new: true });
    res.send(event);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const addEvent = async (req, res) => {
  const body = req.body;
  try {
    const event = new Event({ ...body });
    await event.save();
    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await Event.findByIdAndDelete(id);
    if (isDeleted) {
      res.send("deleted successfully");
    } else {
      res.send("vrey bad");
    }
  } catch (error) {}
};

module.exports = {
  getEvents,
  getEvent,
  eventUpdate,
  addEvent,
  deleteEvent,
  getUserEvent,
};
