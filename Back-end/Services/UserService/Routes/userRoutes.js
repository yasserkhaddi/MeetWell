const express = require("express");
const userController = require("../Controllers/userController");
const user = new userController();
const router = express.Router();
const verifyUser = require("../../../Utils/verifyUser");

router.post("/signup", user.signUp);
router.post("/login", user.logIn);
router.put("/edit/:id", verifyUser, user.edit);
router.put("/addPhone/:id", verifyUser, user.addPhoneNubmer);
router.post("/verifyPass", verifyUser, user.verifyPassword);
module.exports = router;
