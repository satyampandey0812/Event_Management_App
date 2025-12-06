// src/components/EventLogsModal.jsx
import React from "react";
import { useSelector } from "react-redux";
import { formatInTZ } from "../utils/time";

export default function EventLogsModal({ open, event, onClose }) {
  const viewTimezone = useSelector((s) => s.ui.viewTimezone);

  // only hide when modal is closed
  if (!open) return null;

  const logs = event?.logs || [];

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
          <h3 style={{ margin: 0 }}>Event Update History</h3>
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

        {logs.length === 0 ? (
          <p style={{ fontSize: 14, opacity: 0.8 }}>No update history yet.</p>
        ) : (
          <div>
            {[...logs].reverse().map((log, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
                  background: "#f9fafb"
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 6
                  }}
                >
                  {formatInTZ(log.changedAtUTC, viewTimezone)}
                </div>

                {Object.entries(log.changes || {}).map(([field, value]) => (
                  <div key={field} style={{ fontSize: 14, marginBottom: 2 }}>
                    <strong>{field}</strong>:{" "}
                    <span
                      style={{
                        textDecoration: "line-through",
                        opacity: 0.7,
                        marginRight: 4
                      }}
                    >
                      {prettyValue(field, value.old, viewTimezone)}
                    </span>
                    →
                    <span style={{ marginLeft: 4 }}>
                      {prettyValue(field, value.new, viewTimezone)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function prettyValue(field, raw, tz) {
  if (!raw && raw !== 0) return "-";


  if (field === "startUTC" || field === "endUTC" || field === "createdAtUTC") {
    return formatInTZ(raw, tz);
  }

 
  if (field === "profiles") {
    if (!Array.isArray(raw)) return String(raw);
    return raw
      .map((p) => (typeof p === "string" ? p : p.name || p._id))
      .join(", ");
  }

  if (typeof raw === "string") return raw;
  return JSON.stringify(raw);
}
