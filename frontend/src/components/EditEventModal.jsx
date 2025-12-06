// src/components/EditEventModal.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../store/eventsSlice";
import { toUTCISO } from "../utils/time";
import dayjs from "../utils/time"; // default export from time.js

export default function EditEventModal({ open, event, onClose }) {
  const dispatch = useDispatch();
  const profiles = useSelector((s) => s.profiles.list);

  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [timezone, setTimezone] = useState("UTC");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("10:00");
  const [description, setDescription] = useState("");

  // Fill form whenever we open the modal with a new event
  useEffect(() => {
    if (!event) return;

    // profiles
    setSelectedProfiles(event.profiles?.map((p) => p._id || p) || []);

    // timezone
    setTimezone(event.timezone || "UTC");

    // convert stored UTC times into event.timezone for the inputs
    if (event.startUTC) {
      const start = dayjs.utc(event.startUTC).tz(event.timezone || "UTC");
      setStartDate(start.format("YYYY-MM-DD"));
      setStartTime(start.format("HH:mm"));
    }

    if (event.endUTC) {
      const end = dayjs.utc(event.endUTC).tz(event.timezone || "UTC");
      setEndDate(end.format("YYYY-MM-DD"));
      setEndTime(end.format("HH:mm"));
    }
    setDescription(event.description || "");
  }, [event]);

  if (!open || !event) return null; // 👈 ensure we *do* have an event

  const toggleProfile = (id) => {
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || selectedProfiles.length === 0) return;

    const startISO = toUTCISO(startDate, startTime, timezone);
    const endISO = toUTCISO(endDate, endTime, timezone);

    await dispatch(
      updateEvent({
        id: event._id,
        data: {
          profiles: selectedProfiles,
          timezone,
          startISO,
          endISO,
          description
        }
      })
    );

    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      
    >
      <div className="modal-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px"
          }}
        >
          <h3 style={{ margin: 0 }}>Edit Event</h3>
          <button
            onClick={onClose}
            className="secondary"
            style={{
              background: "transparent",
              borderRadius: "9999px",
              padding: "4px 10px",
              border: "none",
              fontSize: 18,
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profiles */}
          <div className="field">
            <label>Profiles</label>
            <div
              style={{
                border: "1px solid #d1d5db",
                borderRadius: 8,
                padding: 8,
                maxHeight: 120,
                overflowY: "auto"
              }}
            >
              {profiles.map((p) => (
                <label
                  key={p._id}
                  style={{ display: "block", fontSize: 14, marginBottom: 4 }}
                >
                  <input
                    type="checkbox"
                    checked={selectedProfiles.includes(p._id)}
                    onChange={() => toggleProfile(p._id)}
                  />
                  {p.name}
                </label>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div className="field">
            <label>Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Kolkata">India (IST)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
            </select>
          </div>
          <div className="field">
  <label>Event Info / Notes</label>
  <textarea
    rows={2}
    style={{
      width: "100%",
      padding: "6px 9px",
      borderRadius: "10px",
      border: "1px solid #d1d5db",
      fontSize: "13px",
      resize: "vertical"
    }}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>


          {/* Start */}
          <div className="field">
            <label>Start Date &amp; Time</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>

          {/* End */}
          <div className="field">
            <label>End Date &amp; Time</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 14
            }}
          >
            <button
              type="button"
              className="secondary"
              onClick={onClose}
              style={{ background: "#e5e7eb", color: "#111827" }}
            >
              Cancel
            </button>
            <button type="submit">Update Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
