import { createSlice } from "@reduxjs/toolkit";
import {
  addAppoint,
  fetchAppoint,
  deleteAppoint,
  fetchTakenTime,
  expiredAppointment,
  sendMessage,
} from "./actions";

const initialState = {
  loading: false,
  error: null,
  appointment: [],
  takenTimes: [],
  expiredAppointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearTakenTimes: (state) => {
      state.takenTimes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //---------------------fetch appointment---------------------
      .addCase(fetchAppoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppoint.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload.appointments;
      })
      .addCase(fetchAppoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //---------------------add appointment---------------------
      .addCase(addAppoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppoint.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment.push(action.payload);
      })
      .addCase(addAppoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //---------------------delete appointment---------------------
      .addCase(deleteAppoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppoint.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(deleteAppoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //---------------------fetched times---------------------
      .addCase(fetchTakenTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTakenTime.fulfilled, (state, action) => {
        state.loading = false;
        state.takenTimes = action.payload;
      })
      .addCase(fetchTakenTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //---------------------expired appointments---------------
      .addCase(expiredAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(expiredAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.expiredAppointments = action.payload.expiredAppointments || [];
      })
      .addCase(expiredAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearTakenTimes } = appointmentSlice.actions;

export default appointmentSlice;
