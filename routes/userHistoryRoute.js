const express = require("express");
const router = express.Router();
const userHistoryController = require("../controllers/userHistoryController");

router.get("/user-history", userHistoryController.getUserHistory);

module.exports = router;
