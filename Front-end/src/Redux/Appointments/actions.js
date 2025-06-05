import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAppoint = createAsyncThunk(
  "appointment/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/appoint/fetch/${userId}`
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addAppoint = createAsyncThunk(
  "appoint/add",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:8080/appoint/add",
        formData
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteAppoint = createAsyncThunk("appoint/delete", async (id) => {
  const result = await axios.delete(
    `http://localhost:8080/appoint/delete/${id}`
  );
  return result.data;
});

export const fetchTakenTime = createAsyncThunk(
  "appoint/takenTime",
  async (date, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/appoint/taken-time/${date}`
      );
      return result.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const expiredAppointment = createAsyncThunk(
  "appointments/expiredAppointment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/appoint/move_expired_appoint"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

