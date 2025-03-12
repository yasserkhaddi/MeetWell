const { appoint, expiredAppoint, deletedAppoint } = require("../config/db");
const { ObjectId } = require("mongodb");

class AppointmentModel {
  // Add appointment
  async addAppoint(appointInfo) {
    const { userId, phoneNumber, date, time, description } = appointInfo;
    try {
      const existingAppointment = await appoint.findOne({
        date: date,
        time: time,
      });

      if (existingAppointment) {
        return {
          status: 400,
          success: false,
          message:
            "Ce créneau horaire est déjà pris. Veuillez en choisir un autre.",
        };
      }

      const newAppoint = {
        userId: new ObjectId(userId),
        phoneNumber,
        date,
        description,
        time,
        timeSaved: new Date().toISOString().slice(0, 16).replace("T", " "),
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
      return { status: 500, success: false, message: err.message };
    }
  }

  //fetch Appointment
  async fetchAppoint(userId) {
    try {
      const fetchedAppoint = await appoint
        .find({ userId: new ObjectId(userId) })
        .sort({ date: 1, time: 1 })
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

  // delete appointment
  async deleteAppoint(id) {
    try {
      const appointToDelete = await appoint.findOne({ _id: new ObjectId(id) });

      if (!appointToDelete) {
        return {
          status: 404,
          success: false,
          message: "Aucun Rendez-vous trouvé",
        };
      }

      await deletedAppoint.insertOne(appointToDelete);

      const result = await appoint.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return {
          status: 404,
          success: false,
          message: "Aucun Rendez-vous trouvé",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Le rendez-vous a été supprimé avec succès",
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        success: false,
        message: "Une erreur est survenue.",
      };
    }
  }

  //fetch by day
  async fetchedAppointByDay(date) {
    try {
      const result = await appoint
        .find({ date })
        .project({ time: 1 })
        .toArray();
      const time = result.map((t) => t.time);
      if (result.length === 0) {
        return { status: 401, message: "error", success: false };
      } else {
        return {
          status: 200,
          success: true,
          time,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, success: false, message: err.message };
    }
  }
  //move the expired appointments

  async moveExpiredAppointments() {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);

      const expiredAppointments = await appoint
        .find({ date: { $lt: currentDate } })
        .toArray();

      if (expiredAppointments.length > 0) {
        await expiredAppoint.insertMany(expiredAppointments);

        await appoint.deleteMany({ date: { $lt: currentDate } });

        return {
          status: 200,
          success: true,
          message: `${expiredAppointments.length} appointments moved to expiredAppointments`,
        };
      } else {
        return {
          status: 200,
          success: true,
          message: "No expired appointments to move",
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, success: false, message: err.message };
    }
  }
}

module.exports = AppointmentModel;
