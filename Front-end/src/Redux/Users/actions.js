import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk("auth/signup", async (formData) => {
  const result = await axios.post(
    "http://localhost:5050/user/signup",
    formData
  );
  return result.data;
});

export const logIn = createAsyncThunk("auth/login", async (formData) => {
  const result = await axios.post(
    "http://localhost:5050/user/login",
    formData,
    { withCredentials: true }
  );
  return result.data;
});
