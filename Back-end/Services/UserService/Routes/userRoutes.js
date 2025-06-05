const express = require("express");
const userController = require("../Controllers/userController");
const user = new userController();
const router = express.Router();
const verifyUser = require("../Utils/verifyUser");

router.post("/signup", user.signUp);
router.post("/login", user.logIn);
router.post("/google", user.google);
router.post("/search-account", user.searchinAccount);
router.post("/generate-email", user.generateEmail);
router.post("/reset-password", user.resetpassword);
router.post("/email-verification", user.emailVerification);
router.post("/verification-email", user.sendVerificationLink);
router.put("/edit/:id", verifyUser, user.edit);
router.put("/addPhone/:id", verifyUser, user.addPhoneNubmer);
router.post("/verifyPass", verifyUser, user.verifyPassword);
router.put("/editPassword/:id", verifyUser, user.changePassword);
router.delete("/deleteAccount/:id", verifyUser, user.deleteAccount);

module.exports = router;
