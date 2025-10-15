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

router.get(
  "/",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.index
);

router.get(
  "/getRepairList",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.fetchRepairList
);

router.post(
  "/assignedByITStaff/:id",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.assignedByItStaff
);
module.exports = router;
