const adminUser = require("../Model/adminUserModel");
const admin = new adminUser();

class adminUserController {
  async fetchUsers(req, res) {
    try {
      await admin.fetchUsers().then((r) => {
        res.status(r.status).json({ message: r.message, users: r.allUsers });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async editUser(req, res) {
    try {
      admin
        .editUser(req.params.id, req.body)
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

  async deleteUser(req, res) {
    try {
      admin
        .deleteUser(req.params.id)
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

  addPhoneNubmer(req, res) {
    try {
      admin
        .addUserPhoneNubmer(req.params.id, req.body)
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

  async AddUser(req, res) {
    try {
      const result = await admin.AddUser(req.body);
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchAllUser(req, res) {
    try {
      await admin.fetchAllUSer().then((r) => {
        res.status(r.status).json({ message: r.message, users: r.users });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //------------------------------------------------------------------------------------------

  async editPassword(req, res) {
    try {
      admin
        .editPassword(req.params.id, req.body.password)
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
}
module.exports = adminUserController;
