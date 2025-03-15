const {
  users,
  appoint,
  expiredAppoint,
  deletedAppointByAdmin,
  deletedAppoint,
  days,
} = require("../../../config/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

class AdminAppointModel {
  async fetchUserAppointment(userId) {
    try {
      const result = await appoint
        .find({ userId: new ObjectId(userId) })
        .sort({ date: 1, time: 1 })
        .toArray();

      return {
        status: 200,
        message: "appointment fetched successfully",
        appointments: result,
      };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error", valid: false };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchAppointment() {
    try {
      const result = await appoint.find().sort({ date: 1, time: 1 }).toArray();
      return {
        status: 200,
        message: "appointment fetched successfully",
        appointments: result,
      };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error", valid: false };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchExpiredAppoint() {
    try {
      const allExpAppoint = await expiredAppoint.find().toArray();
      if (allExpAppoint.length === 0) {
        return { status: 404, message: "Aucun rendez-vous expiré trouvé " };
      } else {
        return {
          status: 200,
          message: "rendez-vous expirés :",
          allExpAppoint,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAppointment(id) {
    try {
      if (!ObjectId.isValid(id)) {
        return { status: 400, message: "ID non valide" };
      }

      const objectId = new ObjectId(id);
      const appointment = await appoint.findOne({ _id: objectId });

      if (!appointment) {
        return { status: 404, message: "Rendez-vous introuvable" };
      }

      const insertResult = await deletedAppointByAdmin.insertOne(appointment);
      if (!insertResult.acknowledged) {
        return {
          status: 500,
          message: "Erreur lors de l'archivage du rendez-vous",
        };
      }
      await appoint.deleteOne({ _id: objectId });

      return { status: 200, message: "Rendez-vous supprimé avec succès" };
    } catch (err) {
      console.error("Delete Appointment Error:", err);
      return {
        status: 500,
        message: "Erreur interne du serveur",
        valid: false,
      };
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAppointmentPerm(id) {
    try {
      if (!ObjectId.isValid(id)) {
        return { status: 400, message: "ID non valide" };
      }

      const objectId = new ObjectId(id);

      const appointment = await expiredAppoint.findOne({ _id: objectId });

      if (!appointment) {
        return { status: 404, message: "Rendez-vous introuvable" };
      }
      await expiredAppoint.deleteOne({ _id: objectId });

      return { status: 200, message: "Rendez-vous supprimé avec succès" };
    } catch (err) {
      console.error("Delete Appointment Error:", err);
      return {
        status: 500,
        message: "Erreur interne du serveur",
        valid: false,
      };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchAppointDeleted() {
    try {
      const allDelAppoint = await deletedAppointByAdmin.find().toArray();
      if (allDelAppoint.length === 0) {
        return { status: 404, message: "Aucun rendez-vous supprimés trouvé " };
      } else {
        return {
          status: 200,
          message: "rendez-vous expirés :",
          allDelAppoint,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAppointmentAdmin(id) {
    try {
      if (!ObjectId.isValid(id)) {
        return { status: 400, message: "ID non valide" };
      }

      const objectId = new ObjectId(id);

      const appointment = await deletedAppointByAdmin.findOne({
        _id: objectId,
      });

      if (!appointment) {
        return { status: 404, message: "Rendez-vous introuvable" };
      }
      await deletedAppointByAdmin.deleteOne({ _id: objectId });

      return { status: 200, message: "Rendez-vous supprimé avec succès" };
    } catch (err) {
      console.error("Delete Appointment Error:", err);
      return {
        status: 500,
        message: "Erreur interne du serveur",
        valid: false,
      };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchDeletedAppointmentUser() {
    try {
      const allDelAppoint = await deletedAppoint.find().toArray();
      if (allDelAppoint.length === 0) {
        return { status: 404, message: "Aucun rendez-vous supprimés trouvé " };
      } else {
        return {
          status: 200,
          message: "rendez-vous supprimés :",
          allDelAppoint,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAppointmentUser(id) {
    try {
      if (!ObjectId.isValid(id)) {
        return { status: 400, message: "ID non valide" };
      }

      const objectId = new ObjectId(id);

      const appointment = await deletedAppoint.findOne({
        _id: objectId,
      });

      if (!appointment) {
        return { status: 404, message: "Rendez-vous introuvable" };
      }
      await deletedAppoint.deleteOne({ _id: objectId });

      return { status: 200, message: "Rendez-vous supprimé avec succès" };
    } catch (err) {
      console.error("Delete Appointment Error:", err);
      return {
        status: 500,
        message: "Erreur interne du serveur",
        valid: false,
      };
    }
  }

  //------------------------------------------------------------------------------------------

  async addApointForUser(appointInfo) {
    const { nom, prenom, phoneNumber, date, time, description } = appointInfo;
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
        nom,
        prenom,
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
}

module.exports = AdminAppointModel;
