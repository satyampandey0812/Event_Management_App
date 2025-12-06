import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API = `${API_BASE}/api`;



export const fetchProfiles = createAsyncThunk(
  "profiles/fetch",
  async () => {
    const res = await axios.get(`${API}/profiles`);
    return res.data;
  }
);

export const createProfile = createAsyncThunk(
  "profiles/create",
  async (payload) => {
    const res = await axios.post(`${API}/profiles`, payload);
    return res.data;
  }
);

const profilesSlice = createSlice({
  name: "profiles",
  initialState: {
    list: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        
        state.list.push(action.payload);
      });
  }
});

export default profilesSlice.reducer;
