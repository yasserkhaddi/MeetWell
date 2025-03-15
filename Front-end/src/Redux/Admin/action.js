import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("admin/fetchUser", async () => {
  const result = await axios.get("http://localhost:6060/admin/fetch-user");
  return result.data;
});

export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:6060/admin/edit-user/${id}`,
      formData,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  const result = await axios.delete(
    `http://localhost:6060/admin/delete-user/${id}`,
    { withCredentials: true }
  );
  return result.data;
});

export const editUserPassword = createAsyncThunk(
  "admin/editUserPassword",
  async ({ id, password }) => {
    const result = await axios.put(
      `http://localhost:6060/admin/edit-user-password/${id}`,
      { password },
      { withCredentials: true }
    );
    return result.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const result = await axios.get(
      "http://localhost:6060/admin/fetch-all-users"
    );
    return result.data;
  }
);

export const fetchUserAppointment = createAsyncThunk(
  "admin/fetchUserAppointment",
  async (userId) => {
    const result = await axios.post(
      "http://localhost:6060/admin/fetch-user/appointments",
      { userId }
    );
    return result.data;
  }
);

export const fetchAppointments = createAsyncThunk(
  "admin/fetchAppointments",
  async () => {
    const result = await axios.get(
      "http://localhost:6060/admin/fetch-appointments"
    );
    return result.data;
  }
);

export const fetchExpiredAppointments = createAsyncThunk(
  "admin/fetchExpiredAppointments",
  async () => {
    const result = await axios.get(
      "http://localhost:6060/admin/fetch-expired-appointment"
    );
    return result.data;
  }
);

export const deleteAppoint = createAsyncThunk(
  "admin/deleteAppoint",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:6060/admin/delete-appointment/${id}`,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const deleteAppointPer = createAsyncThunk(
  "admin/deleteAppointPer",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:6060/admin/delete-appointment-perm/${id}`,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const fetchDeletedAppointments = createAsyncThunk(
  "admin/fetchDeletedAppointments",
  async () => {
    const result = await axios.get(
      "http://localhost:6060/admin/fetch-deleted-appointments"
    );
    return result.data;
  }
);

export const deleteAppointPerAdmin = createAsyncThunk(
  "admin/deleteAppointPerAdmin",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:6060/admin/delete-appointment-perm-admin/${id}`,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const fetchDeletedAppointmentsUser = createAsyncThunk(
  "admin/fetchDeletedAppointmentsUser",
  async () => {
    const result = await axios.get(
      "http://localhost:6060/admin/fetch-deleted-appointments-user"
    );
    return result.data;
  }
);

export const deleteAppointPerUser = createAsyncThunk(
  "admin/deleteAppointPerUser",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:6060/admin/delete-appointment-perm-user/${id}`,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const adminAddAppoint = createAsyncThunk(
  "admin/addAppoint",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:6060/admin/add-appoint",
      formData
    );
    return result.data;
  }
);

export const adminAddPhone = createAsyncThunk(
  "admin/addPhone",
  async ({ id, PhoneNumber }) => {
    const result = await axios.put(
      `http://localhost:6060/admin/addPhone/${id}`,
      { PhoneNumber }
    );
    return result.data;
  }
);

export const verifyAdminPassword = createAsyncThunk(
  "admin/verifyPassword",
  async ({ id, password }) => {
    const result = await axios.post(
      "http://localhost:6060/admin/verify-admin-pass",
      {
        _id: id,
        password,
      },
      { withCredentials: true }
    );
    return result.data;
  }
);

export const changeAdminPassword = createAsyncThunk(
  "admin/changePassword",
  async ({ id, password }) => {
    const result = await axios.put(
      `http://localhost:6060/admin/edit-admin-password/${id}`,
      { password },
      { withCredentials: true }
    );

    return result.data;
  }
);

export const deleteAdminAccount = createAsyncThunk(
  "admin/deleteAccount",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:6060/admin/deleteAccount/${id}`,
      { withCredentials: true }
    );
    return result.data;
  }
);

export const addDisabledDate = createAsyncThunk(
  "admin/addDisabledDate",
  async (dayOff) => {
    const result = await axios.post(
      "http://localhost:6060/admin/add-disabled-date",
      dayOff
    );
    return result.data;
  }
);

export const removeDisabledDate = createAsyncThunk(
  "admin/removeDisabledDate",
  async (date) => {
    const result = await axios.delete(
      `http://localhost:6060/admin/remove-disabled-date`,
      { data: { date } }
    );

    return result.data;
  }
);

export const fetchDisableDate = createAsyncThunk(
  "admin/fetch-disable-date",
  async () => {
    const result = await axios.get("http://localhost:6060/admin/days-off");
    return result.data;
  }
);

export const addUser = createAsyncThunk("admin/add-user", async (formData) => {
  const result = await axios.post(
    "http://localhost:6060/admin/add-user",
    formData
  );
  return result.data;
});

export const upgradToAdmin = createAsyncThunk(
  "admin/upgradeToAdmin",
  async (id) => {
    const result = await axios.put(
      `http://localhost:6060/admin/upgrade-to-admin/${id}`
    );
    return result.data;
  }
);

export const downgradeToUser = createAsyncThunk(
  "admin/downgradeToUser",
  async (id) => {
    const result = await axios.put(
      `http://localhost:6060/admin/downgrade-to-user/${id}`
    );
    return result.data;
  }
);
