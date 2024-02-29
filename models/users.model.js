const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, requird: false },
  email: { type: String, requird: true },
  password: { type: String, requird: true },
  fullName: { type: String, requird: true },
  userEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  userPurchases: [{ type: Object, required: true }],
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
