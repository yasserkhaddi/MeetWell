const express = require("express");
const adminController = require("../Controller/adminController");
const adminUserController = require("../Controller/adminUserController");
const adminAppointController = require("../Controller/adminAppointmentsController");
const admin = new adminController();
const adminUser = new adminUserController();
const adminAppoint = new adminAppointController();
const router = express.Router();

//admin user controller

router.get("/fetch-user", adminUser.fetchUsers);
router.put("/edit-user/:id", adminUser.editUser);
router.delete("/delete-user/:id", adminUser.deleteUser);
router.put("/addPhone/:id", adminUser.addPhoneNubmer);
router.post("/add-user", adminUser.AddUser);
router.get("/fetch-all-users", adminUser.fetchAllUser);
router.put("/edit-user-password/:id", adminUser.editPassword);

//admin appointments controller

router.get("/fetch-expired-appointment", adminAppoint.fetchExpiredAppoint);
router.post("/fetch-user/appointments", adminAppoint.fetchUserAppointment);
router.get("/fetch-appointments", adminAppoint.fetchAppointment);
router.delete("/delete-appointment/:id", adminAppoint.deleteAppointment);
router.delete(
  "/delete-appointment-perm/:id",
  adminAppoint.deleteAppointmentPerm
);
router.get("/fetch-deleted-appointments", adminAppoint.fetchAppointDeleted);
router.delete(
  "/delete-appointment-perm-admin/:id",
  adminAppoint.deleteAppointmentAdmin
);
router.get(
  "/fetch-deleted-appointments-user",
  adminAppoint.fetchDeletedAppointmentUser
);
router.delete(
  "/delete-appointment-perm-user/:id",
  adminAppoint.deleteAppointmentUser
);
router.post("/add-appoint", adminAppoint.addApointForUser);

// admin admin controller

router.post("/verify-admin-pass", admin.verifyAdminPassword);
router.put("/edit-admin-password/:id", admin.changeAdminPassword);
router.delete("/deleteAccount/:id", admin.deleteAccount);

router.post("/add-disabled-date", admin.addDisabledDate);
router.delete("/remove-disabled-date", admin.removeDisabledDate);
router.get("/days-off", admin.fetchDaysOff);
router.put("/upgrade-to-admin/:id", admin.UpgradeToAdmin);
router.put("/downgrade-to-user/:id", admin.downgradeToUser);
module.exports = router;
