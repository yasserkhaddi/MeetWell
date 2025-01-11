const userModel = require("../Models/userModel");
const user = new userModel();

class userController {
  //registration
  async signUp(req, res) {
    try {
      const result = await user.signUp(req.body);
      res.status(result.status).json(result.message);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //login
  async logIn(req, res) {
    try {
      await user.logIn(req.body).then((r) => {
        if (r.valid) {
          res.cookie("access_token", r.token, {
            sameSite: "Lax",
            secure: false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            domain: "localhost",
            path: "/",
          });
          res.cookie("client_info", JSON.stringify(r.user), {
            sameSite: "Lax",
            secure: false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
          });
        }
        res.status(r.status).json(r.message);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //edit user
  edit(req, res) {
    try {
      if (req.user.id === req.params.id) {
        user
          .edit(req.user.id, req.body)
          .then((r) => {
            res.status(r.status).json(r.message);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      } else {
        res.status(403).json({ message: "Forbidden access (Controller)" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //verifyPass
  verifyPassword(req, res) {
    try {
      if (req.user.id === req.body.id) {
        user
          .verifyPassword(req.user.id)
          .then((r) => {
            res.status(r.status).json({ message: r.message, valid: r.valid });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      } else {
        res.status(403).json({ message: "Forbidden access (Controller)" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //adding phone number
  addPhoneNubmer(req, res) {
    try {
      if (req.user.id === req.params.id) {
        user
          .addPhoneNubmer(req.user.id, req.body)
          .then((r) => {
            res.status(r.status).json(r.message);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      } else {
        res.status(403).json({ message: "Forbidden access (Controller)" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = userController;
