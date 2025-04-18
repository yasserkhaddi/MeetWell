const userModel = require("../Models/userModel");
const user = new userModel();
require("dotenv").config();

const USER_COOKIE_ONE = process.env.USER_COOKIE_ONE;
const USER_COOKIE_TWO = process.env.USER_COOKIE_TWO;

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
      const result = await user.logIn(req.body);

      if (result.valid) {
        // Set the cookies
        res.cookie(USER_COOKIE_ONE, result.token, {
          sameSite: "Lax",
          secure: false,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          path: "/",
        });
        res.cookie(USER_COOKIE_TWO, JSON.stringify(result.user), {
          sameSite: "Lax",
          secure: false,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          path: "/",
        });

        return res.status(result.status).json({
          message: result.message,
          user: {
            ...result.user,
            isAdmin: result.user.isAdmin,
          },
        });
      } else {
        return res.status(result.status).json({ message: result.message });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
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
      const { id, password } = req.body;
      if (req.user.id === id) {
        user
          .verifyPassword({ _id: id, password })
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
  // change password
  changePassword(req, res) {
    try {
      if (req.user.id === req.params.id) {
        user
          .changePassword(req.user.id, req.body.password)
          .then((r) => {
            res.status(r.status).json(r.message);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //delete account
  deleteAccount(req, res) {
    try {
      if (req.user.id === req.params.id) {
        user
          .deleteAccount(req.user.id)
          .then((r) => {
            res.status(r.status).json(r.message);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = userController;
