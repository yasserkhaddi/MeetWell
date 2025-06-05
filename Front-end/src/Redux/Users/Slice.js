import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  logIn,
  editUser,
  addPhoneNumber,
  verifyPassword,
  changePassword,
  deleteAccount,
  GoogleAuth,
  searchAccounts,
  generateEmail,
  resetPassword,
  emailVerification,
  sendVerificationLink,
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
        state.error = action.payload;
        console.log(state.error);

        state.loading = false;
      })
      //.....................Google................................

      .addCase(GoogleAuth.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(GoogleAuth.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(GoogleAuth.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(state.error);

        state.loading = false;
      })

      //.....................edit................................
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................add phone number................................
      .addCase(addPhoneNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPhoneNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addPhoneNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................verify password................................
      .addCase(verifyPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................change password................................
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................Delete account................................
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................forgot password................................
      .addCase(searchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(searchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................generate email................................
      .addCase(generateEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateEmail.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(generateEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................reset password................................
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................email Verification................................
      .addCase(emailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.....................Verification link................................
      .addCase(sendVerificationLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationLink.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(sendVerificationLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userslice;
