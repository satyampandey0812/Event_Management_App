import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../store/eventsSlice";
import { toUTCISO } from "../utils/time";



export default function EventForm() {
    const dispatch = useDispatch();
    const profiles = useSelector((s) => s.profiles.list);

    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [timezone, setTimezone] = useState("UTC");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("10:00");
    const [description, setDescription] = useState("");
    const toggleProfile = (id) => {
        setSelectedProfiles((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate || selectedProfiles.length === 0) return;

        const startISO = toUTCISO(startDate, startTime, timezone);
        const endISO = toUTCISO(endDate, endTime, timezone);

        if (new Date(endISO) <= new Date(startISO)) {
            alert("End date/time must be after start date/time.");
            return;
        }

        dispatch(
            createEvent({
                profiles: selectedProfiles,
                timezone,
                startISO,
                endISO,
                description           // ✅ send text to backend
            })
        );
        setSelectedProfiles([]);
        setStartDate("");
        setEndDate("");
    };

    return (
        <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Create Event</h3>
            <form onSubmit={handleSubmit}>
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
                            <label key={p._id} style={{ display: "block", fontSize: 14 }}>
                                <input
                                    type="checkbox"
                                    checked={selectedProfiles.includes(p._id)}
                                    onChange={() => toggleProfile(p._id)}
                                />
                                {p.name}
                            </label>
                        ))}
                        {profiles.length === 0 && (
                            <p style={{ fontSize: 12, opacity: 0.7 }}>
                                No profiles yet. Create one above.
                            </p>
                        )}
                    </div>
                </div>

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
                        placeholder="e.g. Weekly team sync, agenda: roadmap, blockers..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>


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

                <button type="submit" style={{ marginTop: 8 }}>
                    Create Event
                </button>
            </form>
        </div>
    );
}
