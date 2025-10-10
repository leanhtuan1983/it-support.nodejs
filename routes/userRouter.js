const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const userController = require("../controllers/userController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, isAdmin, userController.index);
router.get("/fetchUserData", isLoggedIn, userController.fetchUserData);
router.post("/addUser", isLoggedIn, isAdmin, userController.addUser);
router.get("/getUser/:id", isLoggedIn, userController.fetchUserDetail);
router.put("/update/:id", isLoggedIn, isAdmin, userController.updateUser);
router.delete("/delete/:id", isLoggedIn, isAdmin, userController.deleteUser);
module.exports = router;
