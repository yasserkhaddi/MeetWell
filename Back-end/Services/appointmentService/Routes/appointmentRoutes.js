const express = require("express");
const AppointmentController = require("../Controllers/appointmentController");
const appoint = new AppointmentController();

const router = express.Router();

router.post("/add", appoint.addAppoint);
router.get("/fetch/:userId", appoint.fetchAppoint);

module.exports = router;
