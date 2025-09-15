const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const authController = require("../controllers/authController");

router.get("/login", authController.loginForm);
router.post("/postLogin", authController.postLogin);
router.get("/logout", authController.logout);

module.exports = router;
