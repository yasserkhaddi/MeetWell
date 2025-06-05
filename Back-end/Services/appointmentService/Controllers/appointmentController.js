const AppointmentModel = require("../Models/appointmentModel");
const appoint = new AppointmentModel();

class AppointmentController {
  // add appointment
  async addAppoint(req, res) {
    try {
      const result = await appoint.addAppoint(req.body);

      if (result.success) {
        return res.status(result.status).json({
          message: result.message,
          data: result.addAppoint,
        });
      } else {
        return res.status(result.status).json({
          message: result.message,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }

  //fetch appointment
  async fetchAppoint(req, res) {
    const { userId } = req.params;
    try {
      const result = await appoint.fetchAppoint(userId);
      if (result.success) {
        return res.status(result.status).json({
          message: result.message,
          appointments: result.fetchedAppoint,
        });
      } else {
        return res.status(result.status).json({
          message: result.message,
          appointments: result.fetchedAppoint,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  //  //send message before 1h
  async sendMessage(req, res) {
    try {
      const result = await appoint.sendMessage();

      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }

  // delete appoint
  async deleteAppoint(req, res) {
    const { id } = req.params;
    try {
      const result = await appoint.deleteAppoint(id);

      return res.status(result.status).json({
        message: result.message,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
  //fetch by day
  async fetchedAppointByDay(req, res) {
    const { date } = req.params;
    try {
      const result = await appoint.fetchedAppointByDay(date);
      return res
        .status(result.status)
        .json({ message: result.message, times: result.time });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
  //move the expired appointments
  async moveExpiredAppointments(req, res) {
    try {
      const result = await appoint.moveExpiredAppointments();

      return res.status(result.status).json({
        success: result.success,
        message: result.message,
      });
    } catch (err) {
      console.error("Error in moveExpiredAppointments:", err);
      return res.status(500).json({
        success: false,
        message:
          "An unexpected error occurred while moving expired appointments.",
      });
    }
  }
}

module.exports = AppointmentController;
