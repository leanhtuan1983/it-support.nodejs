const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.get("/fetchUserData", userController.fetchUserData);
router.post("/addUser", userController.addUser);
router.get("/getUser/:id", userController.fetchUserDetail);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
module.exports = router;
