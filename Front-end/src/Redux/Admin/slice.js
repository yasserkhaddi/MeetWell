import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUser,
  fetchUserAppointment,
  fetchAppointments,
  editUser,
  deleteUser,
  fetchExpiredAppointments,
  deleteAppoint,
  editUserPassword,
  deleteAppointPer,
  fetchDeletedAppointments,
  deleteAppointPerAdmin,
  fetchDeletedAppointmentsUser,
  deleteAppointPerUser,
  adminAddAppoint,
  adminAddPhone,
  verifyAdminPassword,
  changeAdminPassword,
  deleteAdminAccount,
  addDisabledDate,
  removeDisabledDate,
  fetchDisableDate,
  addUser,
  upgradToAdmin,
  fetchAllUsers,
  downgradeToUser,
  addDisabledDateRange,
  moveExpiredDaysOff,
  fetchExpiredDaysOff,
} from "./action";

const initialState = {
  user: null,
  appointments: null,
  expiredAppointments: null,
  deletedAppointments: null,
  deletedAppointmentsByUser: null,
  disabledDates: [],
  expiredDaysOff: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //.......................fetch Users............................
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch Users appointments............................
      .addCase(fetchUserAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchUserAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch appointments............................
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................edit user............................
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................delete user............................
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................expired appointments............................
      .addCase(fetchExpiredAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpiredAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.expiredAppointments = action.payload;
      })
      .addCase(fetchExpiredAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................delete appointment............................
      .addCase(deleteAppoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppoint.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(deleteAppoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................edit user password............................
      .addCase(editUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................delete appointment Perm............................
      .addCase(deleteAppointPer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointPer.fulfilled, (state, action) => {
        state.loading = false;
        state.expiredAppointments = action.payload;
      })
      .addCase(deleteAppointPer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch deleted Appointments............................
      .addCase(fetchDeletedAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedAppointments = action.payload;
      })
      .addCase(fetchDeletedAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................delete appointment Perm admin............................
      .addCase(deleteAppointPerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointPerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedAppointments = action.payload;
      })
      .addCase(deleteAppointPerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch deleted Appointments............................
      .addCase(fetchDeletedAppointmentsUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedAppointmentsUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedAppointmentsByUser = action.payload;
      })
      .addCase(fetchDeletedAppointmentsUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................delete appointment Perm user............................
      .addCase(deleteAppointPerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointPerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedAppointmentsByUser = action.payload;
      })
      .addCase(deleteAppointPerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................add appoint............................
      .addCase(adminAddAppoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminAddAppoint.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(adminAddAppoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................add phone............................
      .addCase(adminAddPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminAddPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(adminAddPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //.......................verify password............................
      .addCase(verifyAdminPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................change Password............................
      .addCase(changeAdminPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................delete account............................
      .addCase(deleteAdminAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteAdminAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................add day off............................
      .addCase(addDisabledDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDisabledDate.fulfilled, (state, action) => {
        state.loading = false;
        state.disabledDates = action.payload;
      })
      .addCase(addDisabledDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //.......................delete day off............................

      .addCase(removeDisabledDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeDisabledDate.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.disabledDates)) {
          state.disabledDates = state.disabledDates.filter(
            (date) => date.id !== action.payload?.id
          );
        } else {
          state.disabledDates = [];
        }
      })
      .addCase(removeDisabledDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch day off............................

      .addCase(fetchDisableDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisableDate.fulfilled, (state, action) => {
        state.loading = false;
        state.disabledDates = action.payload;
      })
      .addCase(fetchDisableDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................add user............................

      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch All Users............................

      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................upgrade to admin............................

      .addCase(upgradToAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upgradToAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(upgradToAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................downgrade to user............................

      .addCase(downgradeToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downgradeToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(downgradeToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................add Disabled Date Range............................

      .addCase(addDisabledDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDisabledDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.disabledDates = action.payload;
      })
      .addCase(addDisabledDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................move Expired Days Off............................

      .addCase(moveExpiredDaysOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveExpiredDaysOff.fulfilled, (state, action) => {
        state.loading = false;
        state.expiredDaysOff = action.payload;
      })
      .addCase(moveExpiredDaysOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //.......................fetch Expired Days Off............................

      .addCase(fetchExpiredDaysOff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpiredDaysOff.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchExpiredDaysOff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice;
