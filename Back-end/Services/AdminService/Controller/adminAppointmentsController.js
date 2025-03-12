const adminAppoint = require("../Model/adminAppointmentsModel");
const admin = new adminAppoint();

class AdminAppointController {
  async fetchUserAppointment(req, res) {
    try {
      await admin.fetchUserAppointment(req.body.userId).then((r) => {
        res
          .status(r.status)
          .json({ message: r.message, appointments: r.appointments });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchAppointment(req, res) {
    try {
      await admin.fetchAppointment().then((r) => {
        res
          .status(r.status)
          .json({ message: r.message, appointments: r.appointments });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchExpiredAppoint(req, res) {
    try {
      await admin.fetchExpiredAppoint().then((r) => {
        res
          .status(r.status)
          .json({ message: r.message, expiredAppoint: r.allExpAppoint });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAppointment(req, res) {
    try {
      admin
        .deleteAppointment(req.params.id)
        .then((r) => {
          res.status(r.status).json(r.message);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAppointmentPerm(req, res) {
    try {
      admin
        .deleteAppointmentPerm(req.params.id)
        .then((r) => {
          res.status(r.status).json(r.message);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------
  async fetchAppointDeleted(req, res) {
    try {
      await admin.fetchAppointDeleted().then((r) => {
        res
          .status(r.status)
          .json({ message: r.message, deletedAppointments: r.allDelAppoint });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //------------------------------------------------------------------------------------------

  async deleteAppointmentAdmin(req, res) {
    try {
      admin
        .deleteAppointmentAdmin(req.params.id)
        .then((r) => {
          res.status(r.status).json(r.message);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //------------------------------------------------------------------------------------------
  async fetchDeletedAppointmentUser(req, res) {
    try {
      await admin.fetchDeletedAppointmentUser().then((r) => {
        res
          .status(r.status)
          .json({ message: r.message, deletedAppointments: r.allDelAppoint });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //------------------------------------------------------------------------------------------

  async deleteAppointmentUser(req, res) {
    try {
      admin
        .deleteAppointmentUser(req.params.id)
        .then((r) => {
          res.status(r.status).json(r.message);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async addApointForUser(req, res) {
    try {
      const result = await admin.addApointForUser(req.body);

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
}

module.exports = AdminAppointController;
