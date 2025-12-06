const router = require("express").Router();
const Profile = require("../models/Profile");

// POST /api/profiles 
router.post("/", async (req, res) => {
  try {
    const { name, timezone } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const profile = await Profile.create({
      name: name.trim(),
      timezone: timezone || "UTC"
    });

    res.status(201).json(profile);
  } catch (err) {
    console.error("Create profile error:", err);
    res.status(500).json({ message: "Server error creating profile" });
  }
});

// GET /api/profiles 
router.get("/", async (_req, res) => {
  const profiles = await Profile.find().sort({ createdAt: -1 });
  res.json(profiles);
});

module.exports = router;
