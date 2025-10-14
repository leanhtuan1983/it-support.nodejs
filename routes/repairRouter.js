const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const repairController = require("../controllers/repairController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
  allowRoles,
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, isAdmin, repairController.index);

router.get(
  "/getRepairList",
  isLoggedIn,
  isAdmin,
  repairController.fetchRepairList
);

module.exports = router;
