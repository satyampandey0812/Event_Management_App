import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfileId: null,
  viewTimezone: "UTC"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentProfile(state, action) {
      state.currentProfileId = action.payload;
    },
    setViewTimezone(state, action) {
      state.viewTimezone = action.payload;
    }
  }
});

export const { setCurrentProfile, setViewTimezone } = uiSlice.actions;
export default uiSlice.reducer;
