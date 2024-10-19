const express = require("express");
const userController = require("../Controllers/userController");
const user = new userController();
const router = express.Router();

router.post("/signup", user.signUp);
router.post("/login", user.logIn);

module.exports = router;
