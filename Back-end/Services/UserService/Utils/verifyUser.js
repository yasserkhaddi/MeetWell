const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_CODE = process.env.SECRET_CODE;

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  } else {
    jwt.verify(token, SECRET_CODE, (err, user) => {
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
