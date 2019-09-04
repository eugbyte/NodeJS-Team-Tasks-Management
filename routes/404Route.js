const express = require('express');
const router = express.Router();
const errorControllers = require("../controllers/errorsController");

router.use('/', errorControllers.PageNotFound);

module.exports = router;


