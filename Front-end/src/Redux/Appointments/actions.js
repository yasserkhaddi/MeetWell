import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAppoint = createAsyncThunk(
  "appointment/fetch",
  async (userId) => {
    const result = await axios.get(
      `http://localhost:8080/appoint/fetch/${userId}`
    );
    return result.data;
  }
);

export const addAppoint = createAsyncThunk("appoint/add", async (formdata) => {
  const result = await axios.post(
    "http://localhost:8080/appoint/add",
    formdata
  );
  return result.data;
});
