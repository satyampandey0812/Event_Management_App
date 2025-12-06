import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../store/profilesSlice";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata"); 

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting profile:", name, timezone); 

  if (!name.trim()) return;

  const result = await dispatch(
    createProfile({
      name: name.trim(),
      timezone
    })
  );

  console.log("Profile create result:", result); 

  setName("");
};

  return (
    <div className="card">
      <h3 style={{ marginTop: 0, marginBottom: 8 }}>Create Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Profile Name</label>
          <input
            type="text"
            placeholder="e.g. Satyam"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Default Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="Asia/Kolkata">India (IST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time (ET)</option>
          </select>
        </div>
        

        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
}
