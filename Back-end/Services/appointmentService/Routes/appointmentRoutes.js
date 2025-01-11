const express = require("express");
const AppointmentController = require("../Controllers/appointmentController");
const appoint = new AppointmentController();

const router = express.Router();

router.post("/add", appoint.addAppoint);
router.get("/fetch/:userId", appoint.fetchAppoint);
router.delete("/delete/:id", appoint.deleteAppoint);
router.get("/taken-time/:date", appoint.fetchedAppointByDay);
router.post("/move_expired_appoint", appoint.moveExpiredAppointments);
module.exports = router;
