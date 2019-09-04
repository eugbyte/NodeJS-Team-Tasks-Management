const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const authController = require("../controllers/authController");


router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

router.get(("/signup"),  authController.getSignup);

router.post(("/signup"), authController.postSignup);

module.exports = router;
