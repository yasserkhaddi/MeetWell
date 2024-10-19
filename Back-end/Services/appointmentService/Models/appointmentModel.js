const { appoint } = require("../../../config/db");
const { ObjectId } = require("mongodb");
class AppointmentModel {
  // Add appointment
  async addAppoint(appointInfo) {
    const { userId, phoneNumber, day, time, timeSaved } = appointInfo;
    try {
      const existingAppointment = await appoint.findOne({
        day: day,
        time: time,
      });

      if (existingAppointment) {
        throw new Error(
          "This time slot is already taken. Please choose another."
        );
      }

      const newAppoint = {
        userId,
        phoneNumber,
        day,
        time,
        timeSaved,
      };

      const addAppoint = await appoint.insertOne(newAppoint);

      return {
        status: 200,
        success: true,
        message: "Appointment added successfully",
        addAppoint,
      };
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }
  //fetch Appointment
  async fetchAppoint(userId) {
    try {
      const fetchedAppoint = await appoint
        .find({ userId: new ObjectId(userId) })
        .toArray();

      if (fetchedAppoint.length === 0) {
        return {
          status: 404,
          success: false,
          message: "No appointments found",
        };
      } else {
        return {
          status: 200,
          message: "Appointment fetched successfully",
          fetchedAppoint,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }
}

module.exports = AppointmentModel;
