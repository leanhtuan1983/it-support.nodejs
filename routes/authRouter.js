const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const authController = require("../controllers/authController");

router.get("/login", authController.loginForm);

module.exports = router;
