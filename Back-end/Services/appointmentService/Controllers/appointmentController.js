const app = require("../../../config/server");
const AppointmentModel = require("../Models/appointmentModel");
const appoint = new AppointmentModel();

class AppointmentController {
  // add appointment
  async addAppoint(req, res) {
    try {
      await appoint.addAppoint(req.body).then((r) => {
        if (r.success) {
          return res.status(r.status).json(r.message);
        }
      });
    } catch (err) {
      console.error(err);
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
}

module.exports = AppointmentController;
