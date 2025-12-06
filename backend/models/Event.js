const mongoose = require("mongoose");

const eventUpdateLogSchema = new mongoose.Schema(
  {
    changedAtUTC: { type: Date, required: true },
    changes: Object
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema({
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
  timezone: { type: String, required: true },
  startUTC: { type: Date, required: true },
  endUTC: { type: Date, required: true },
  createdAtUTC: { type: Date, default: Date.now },
  updatedAtUTC: { type: Date, default: Date.now },
   description: { type: String, default: "" },
  logs: { type: [eventUpdateLogSchema], default: [] }
});

module.exports = mongoose.model("Event", eventSchema);
