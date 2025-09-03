const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.index);


module.exports = router;
