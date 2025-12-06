import { formatInTZ } from "../utils/time";

export default function EventCard({ event, viewTimezone, onEdit, onViewLogs }) {
  if (!event) return null;

  const profileNames = (event.profiles || [])
    .map((p) => p.name)
    .join(", ");

   const desc = (event.description || "").trim();
const shortDesc =
  desc.length > 80 ? desc.slice(0, 80).trimEnd() + "…" : desc;
 

  return (
    <div className="card">
      
      <div className="event-header-row">
        <div>
          <div className="event-title">
            {profileNames || "Event for multiple profiles"}
          </div>
          <div className="event-meta">
            Base TZ: <strong>{event.timezone}</strong>
          </div>
        </div>
        <span className="event-chip">
          {viewTimezone} view
        </span>
      </div>

   
      {shortDesc && (
  <div
    style={{
      marginTop: 6,
      fontSize: 12,
      color: "#4b5563",
      padding: "6px 8px",
      borderRadius: 8,
      background: "#f3f4ff"
    }}
  >
    {shortDesc}
  </div>
)}

      <div style={{ fontSize: 13, marginTop: 6 }}>
        <div>
          <strong>Start</strong>{" "}
          <span style={{ color: "#111827" }}>
            {formatInTZ(event.startUTC, viewTimezone)}
          </span>
        </div>
        <div>
          <strong>End</strong>{" "}
          <span style={{ color: "#111827" }}>
            {formatInTZ(event.endUTC, viewTimezone)}
          </span>
        </div>
      </div>

     
      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 6 }}>
        <div>
          Created: {formatInTZ(event.createdAtUTC, viewTimezone)}
        </div>
        <div>
          Updated: {formatInTZ(event.updatedAtUTC, viewTimezone)}
        </div>
      </div>

     
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 10,
          justifyContent: "flex-end"
        }}
      >
        <button onClick={onEdit}>
          ✏️ Edit
        </button>
        <button
          style={{
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            boxShadow: "0 10px 22px rgba(22,163,74,0.35)"
          }}
          onClick={onViewLogs}
        >
          🕒 Logs
        </button>
      </div>
    </div>
  );
}
