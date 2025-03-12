const app = require("../config/server");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  } else {
    jwt.verify(token, "yasserkhaddi2003", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden access" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = verifyUser;
