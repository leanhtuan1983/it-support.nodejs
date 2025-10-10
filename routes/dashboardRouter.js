const express = require("express");
const router = express.Router();
const middlewares_auth = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, dashboardController.index);
router.get("/totalEq", isLoggedIn, dashboardController.totalEq);
router.get("/eqInUse", isLoggedIn, dashboardController.eqInUse);
router.get("/repairReq", isLoggedIn, dashboardController.repairReqTicket);
router.get("/setupReq", isLoggedIn, dashboardController.setupReqTicket);

router.get(
  "/getTicketInfoOfCurrentLoginUser",
  isLoggedIn,
  dashboardController.getTicketInfoOfCurrentLoginUser
);

module.exports = router;
