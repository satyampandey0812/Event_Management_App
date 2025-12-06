// backend/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// debug log: check MONGO_URI is loaded
console.log("MONGO_URI from env:", process.env.MONGO_URI);

// connect to Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo error", err));

// basic route to test server
app.get("/", (req, res) => {
  res.send("API running");
});

// routes
const profileRoutes = require("./routes/profileRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/profiles", profileRoutes);
app.use("/api/events", eventRoutes);

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
