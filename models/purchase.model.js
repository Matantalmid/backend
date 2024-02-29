const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  fullName: { type: String, require: true },
  price: { type: Number, require: true },
  numOfTicekts: { type: Number, require: true },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = { Purchase };
