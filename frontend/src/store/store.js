import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "./profilesSlice";
import eventsReducer from "./eventsSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    events: eventsReducer,
    ui: uiReducer
  }
});

export default store;
