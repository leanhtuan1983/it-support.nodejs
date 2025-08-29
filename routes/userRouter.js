const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.get("/fetchUserData", userController.fetchUserData);
router.get("/:id", userController.fetchUserDetail);
module.exports = router;
