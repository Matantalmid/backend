const { Router } = require("express");
const router = Router();
const { Event } = require("../models/event.model");
const {
  getEvents,
  getEvent,
  eventUpdate,
  addEvent,
  deleteEvent,
  getUserEvent,
} = require("../controllers/event.controller");

router.post("/", getEvent);
router.get("/", getEvents);

router.post("/getUserEvent", getUserEvent);

router.post("/NewEvent", addEvent);

router.post("/DeleteEvent", deleteEvent);

router.patch("/:id", eventUpdate);

module.exports = router;
