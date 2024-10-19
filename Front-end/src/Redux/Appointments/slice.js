import { createSlice } from "@reduxjs/toolkit";
import { addAppoint, fetchAppoint } from "./actions";

const initialState = {
  loading: false,
  error: null,
  appointment: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //---------------------fetch appointment---------------------
      .addCase(fetchAppoint.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAppoint.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
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
        state.error = null;
        state.appointment = action.payload;
      })
      .addCase(addAppoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice;
