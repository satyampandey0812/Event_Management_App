import { useSelector } from "react-redux";
import { useState } from "react";
import EventCard from "./EventCard";
import EditEventModal from "./EditEventModal";
import EventLogsModal from "./EventLogsModal";

export default function EventList() {
  const events = useSelector((s) => s.events.list);
  const viewTimezone = useSelector((s) => s.ui.viewTimezone);

  const [activeEvent, setActiveEvent] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);

  if (!events.length)
    return <p style={{ opacity: 0.6 }}>No events found for this user.</p>;

  return (
    <>
      <div>
        {events.map((ev) => (
          <EventCard
            key={ev._id}
            event={ev}
            viewTimezone={viewTimezone}
            onEdit={() => {
              setActiveEvent(ev);
              setEditOpen(true);
            }}
            onViewLogs={() => {
              setActiveEvent(ev);
              setLogsOpen(true);
            }}
          />
        ))}
      </div>

      <EditEventModal
        open={editOpen}
        event={activeEvent}
        onClose={() => setEditOpen(false)}
      />

      <EventLogsModal
        open={logsOpen}
        event={activeEvent}
        onClose={() => setLogsOpen(false)}
      />
    </>
  );
}
