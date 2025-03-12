import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  logIn,
  editUser,
  addPhoneNumber,
  verifyPassword,
  changePassword,
  deleteAccount,
} from "./actions";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userslice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //.......................signUp............................

      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................login................................

      .addCase(logIn.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(state.error);

        state.loading = false;
      })
      //.....................edit................................
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................add phone number................................
      .addCase(addPhoneNumber.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addPhoneNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(addPhoneNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................verify password................................
      .addCase(verifyPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................change password................................
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................Delete account................................
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userslice;
