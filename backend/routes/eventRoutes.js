const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// CREATE EVENT  POST 
router.post("/", async (req, res) => {
  try {
    const { profiles, timezone, startISO, endISO , description} = req.body;

    if (!profiles || !profiles.length) {
      return res.status(400).json({ message: "At least one profile required" });
    }

    const startUTC = new Date(startISO);
    const endUTC = new Date(endISO);

    if (endUTC <= startUTC) {
      return res
        .status(400)
        .json({ message: "End date/time must be after start date/time" });
    }

    const event = await Event.create({
      profiles,
      timezone,
      startUTC,
      endUTC,
      description: description || "",
      createdAtUTC: new Date(),
      updatedAtUTC: new Date(),
      logs: []
    });

    const populated = await event.populate("profiles");
    res.status(201).json(populated);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: "Server error creating event" });
  }
});

// GET EVENTS  
router.get("/", async (req, res) => {
  try {
    const { profileId } = req.query;
    const query = profileId ? { profiles: profileId } : {};
    const events = await Event.find(query).populate("profiles");
    res.json(events);
  } catch (err) {
    console.error("Get events error:", err);
    res.status(500).json({ message: "Server error fetching events" });
  }
});

// UPDATE EVENT  PUT 
router.put("/:id", async (req, res) => {
  try {
    const { timezone, startISO, endISO, profiles, description } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const changes = {};

    // ... existing timezone/start/end/profiles logic ...

    if (typeof description === "string" && description !== event.description) {
      changes.description = { old: event.description, new: description };
      event.description = description;
    }

    event.updatedAtUTC = new Date();

    if (Object.keys(changes).length > 0) {
      event.logs.push({
        changedAtUTC: new Date(),
        changes
      });
    }

    await event.save();
    const populated = await event.populate("profiles");
    res.json(populated);
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({ message: "Server error updating event" });
  }
});


module.exports = router;
