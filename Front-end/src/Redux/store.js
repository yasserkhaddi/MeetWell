import { configureStore } from "@reduxjs/toolkit";
import userslice from "./Users/Slice";
import appointmentSlice from "./Appointments/slice";
import adminSlice from "./Admin/slice";

const store = configureStore({
  reducer: {
    users: userslice.reducer,
    appointment: appointmentSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
