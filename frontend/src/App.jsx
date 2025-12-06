import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "./store/profilesSlice";
import { fetchEvents } from "./store/eventsSlice";
import { setCurrentProfile, setViewTimezone } from "./store/uiSlice";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import ProfileForm from "./components/ProfileForm";

export default function App() {
  const dispatch = useDispatch();
  const profiles = useSelector((s) => s.profiles.list);
  const currentProfileId = useSelector((s) => s.ui.currentProfileId);
  const viewTimezone = useSelector((s) => s.ui.viewTimezone);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  useEffect(() => {
    if (currentProfileId) dispatch(fetchEvents(currentProfileId));
  }, [currentProfileId, dispatch]);

  return (
    <div className="container">
      <header className="header">
  <h1 className="logo">Event Management</h1>
  <span className="badge">MERN • Timezone-aware</span>
</header>


      <div className="layout">
       
        <aside className="left-panel">
          <ProfileForm />
          <EventForm />
        </aside>

        
        <section className="right-panel">
          <div className="topbar">
            <select
              className="dropdown"
              value={currentProfileId || ""}
              onChange={(e) => dispatch(setCurrentProfile(e.target.value))}
            >
              <option value="">Select Profile</option>
              {profiles.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="dropdown"
              value={viewTimezone}
              onChange={(e) => dispatch(setViewTimezone(e.target.value))}
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Kolkata">IST</option>
              <option value="America/New_York">ET</option>
            </select>
          </div>

          <EventList />
        </section>
      </div>
    </div>
  );
}
