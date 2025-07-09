import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk("auth/signup", async (formData) => {
  const result = await axios.post(
    "http://localhost:5050/user/signup",
    formData
  );
  return result.data;
});

export const logIn = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:5050/user/login",

        formData,
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }
  }
);

export const GoogleAuth = createAsyncThunk("auth/google", async (userData) => {
  const result = await axios.post(
    "http://localhost:5050/user/google",
    userData,
    { withCredentials: true }
  );
  return result.data;
});

export const editUser = createAsyncThunk(
  "user/edit",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5050/user/edit/${id}`,
      formData,
      { withCredentials: true }
    );

    return result.data;
  }
);

export const addPhoneNumber = createAsyncThunk(
  "User/addPhoneNumber",
  async ({ id, PhoneNumber }) => {
    const result = await axios.put(
      `http://localhost:5050/user/addPhone/${id}`,
      { PhoneNumber },
      { withCredentials: true }
    );

    return result.config.data;
  }
);

export const verifyPassword = createAsyncThunk(
  "User/verifyPassword",
  async ({ id, password }) => {
    const result = await axios.post(
      "http://localhost:5050/user/verifyPass",
      {
        id,
        password,
      },
      { withCredentials: true }
    );
    return result.data;
  }
);

export const changePassword = createAsyncThunk(
  "User/changePassword",
  async ({ id, password }) => {
    const result = await axios.put(
      `http://localhost:5050/user/editPassword/${id}`,
      { password },
      { withCredentials: true }
    );
    return result.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "User/deleteAccount",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5050/user/deleteAccount/${id}`,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const searchAccounts = createAsyncThunk(
  "User/searchAccount",
  async (email) => {
    const result = await axios.post(
      "http://localhost:5050/user/search-account",
      { email }
    );
    return result.data;
  }
);

export const generateEmail = createAsyncThunk(
  "User/generateForgotPasswordEmail",
  async (email) => {
    const result = await axios.post(
      "http://localhost:5050/user/generate-email",
      { email }
    );
    return result.data;
  }
);

export const resetPassword = createAsyncThunk(
  "User/resetPassword",
  async ({ token, password }) => {
    const result = await axios.post(
      "http://localhost:5050/user/reset-password",
      { token, password }
    );
    return result.data;
  }
);

export const emailVerification = createAsyncThunk(
  "User/emailVerification",
  async (token) => {
    const result = await axios.post(
      "http://localhost:5050/user/email-verification",
      { token },
      { withCredentials: true }
    );


    return result.data;
  }
);

export const sendVerificationLink = createAsyncThunk(
  "User/VerificationLink",
  async (email) => {
    const result = await axios.post(
      "http://localhost:5050/user/verification-email",
      { email }
    );
    return result.data;
  }
);
