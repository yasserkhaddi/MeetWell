const adminModel = require("../Model/adminModel");
const admin = new adminModel();

class adminController {
  verifyAdminPassword(req, res) {
    try {
      const id = req.body._id;
      const password = req.body.password;

      admin
        .verifyAdminPassword({ _id: id, password })
        .then((r) => {
          res.status(r.status).json({ message: r.message, valid: r.valid });
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

  changeAdminPassword(req, res) {
    try {
      admin
        .changeAdminPassword(req.params.id, req.body.password)
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

  deleteAccount(req, res) {
    try {
      admin
        .deleteAccount(req.params.id)
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

  async addDisabledDate(req, res) {
    try {
      const result = await admin.addDisabledDate(req.body);
      res.status(result.status).json({
        message: result.message,
        disabledDate: result.disabledDate,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async addDisabledDatesRange(req, res) {
    try {
      console.log(req.body);

      const result = await admin.addDisabledDatesRange(req.body);
      res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async removeDisabledDate(req, res) {
    try {
      const result = await admin.removeDisabledDate(req.body.date.date);
      res.status(result.status).json({
        message: result.message,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //------------------------------------------------------------------------------------------

  async moveExpiredDays(req, res) {
    try {
      const result = await admin.moveExpiredDays();
      res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchExpiredDaysOff(req, res) {
    try {
      const result = await admin.fetchExpiredDaysOff();
      res.status(result.status).json({
        message: result.message,
        expiredDaysOff: result.expiredDaysOff,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchDaysOff(req, res) {
    try {
      await admin.fetchDates().then((r) => {
        res.status(r.status).json({ message: r.message, days: r.day });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async UpgradeToAdmin(req, res) {
    try {
      const currentUserId = req.body.userId;
      const targetUserId = req.params.id;

      const result = await admin.upgradeToAdmin(currentUserId, targetUserId);

      res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }

  //------------------------------------------------------------------------------------------

  async downgradeToUser(req, res) {
    try {
      const result = await admin.downgradeToUser(req.params.id);
      res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = adminController;
