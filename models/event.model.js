const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: { type: String, required: false },
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  hour: { type: String, required: true },
  place: { type: String, required: true },
  numOfPepole: { type: String, required: true }, // 2500 seats/people
  description: { type: String, required: true },
  image: { type: String, required: true },
  eventType: { type: String, required: true },
  artist: { type: String, required: true },
  purchasers: { type: [Object], default: [] },
  seatsLeft: { type: Number, required: true }, // 2500 seats/people
  eventPrice: { type: Number, required: true },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event };
