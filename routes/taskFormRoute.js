const express = require("express");
const router = express.Router();
const isAuth = require("../services/authService");
const matchUsers = require("../services/userMatch");
const taskFormController = require("../controllers/taskFormController");

//GET -> Create
router.get("/task-form", taskFormController.getCreate);

//GET -> Update
router.get("/task-form/update/:taskId", isAuth, matchUsers, taskFormController.getUpdate);
        
//POST -> Create
router.post("/task-form", isAuth, taskFormController.postCreate);

//POST -> Update
router.post("/task-form-update", isAuth, taskFormController.postUpdate);

//POST -> Delete
router.post("/delete", isAuth, matchUsers, taskFormController.postDelete);

//POST -> Complete
router.post("/complete", isAuth, matchUsers, taskFormController.postComplete);

module.exports = router;