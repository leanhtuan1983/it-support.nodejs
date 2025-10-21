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

router.get(
  "/getAssignedTicketOfCurrentLoggedInITStaff",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.getAssignedTicketOfCurrentLoggedInITStaff
);

router.post(
  "/assignedByITStaff/:id",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.assignedByItStaff
);

router.put(
  "/updateTask/:id",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.updateTask
);

router.get(
  "/getTicketInfo/:id",
  isLoggedIn,
  allowRoles(["admin", "it_staff"]),
  repairController.getTicketInfo
);
module.exports = router;
