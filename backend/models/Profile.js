const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timezone: { type: String, default: "UTC" } 
});

module.exports = mongoose.model("Profile", profileSchema);
