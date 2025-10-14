const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const ticketController = require("../controllers/ticketController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, ticketController.index);
router.get("/fetchTicketData", isLoggedIn, ticketController.fetchTicketData);
router.post("/addOwnTicket", isLoggedIn, ticketController.addOwnTicket);
router.post("/addPartnerTicket", isLoggedIn, ticketController.addPartnerTicket);
module.exports = router;
