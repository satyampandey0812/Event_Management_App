import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API = `${API_BASE}/api`;



export const fetchEvents = createAsyncThunk(
  "events/fetch",
  async (profileId) =>
    (await axios.get(`${API}/events`, { params: { profileId } })).data
);

export const createEvent = createAsyncThunk(
  "events/create",
  async (payload) => (await axios.post(`${API}/events`, payload)).data
);

export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, data }) => (await axios.put(`${API}/events/${id}`, data)).data
);

const eventsSlice = createSlice({
  name: "events",
  initialState: { list: [], status: "idle", selectedEvent: null },
  reducers: {
    setSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.list.findIndex((e) => e._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  }
});

export const { setSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
