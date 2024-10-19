import { configureStore } from "@reduxjs/toolkit";
import userslice from "./Users/Slice";
import appointmentSlice from "./Appointments/slice";

const store = configureStore({
  reducer: {
    users: userslice.reducer,
    appointment: appointmentSlice.reducer,
  },
});

export default store;
