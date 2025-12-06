const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timezone: { type: String, default: "UTC" } // e.g. "Asia/Kolkata"
});

module.exports = mongoose.model("Profile", profileSchema);
