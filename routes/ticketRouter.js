const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const ticketController = require("../controllers/ticketController");

const { isLoggedIn } = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, ticketController.index);
router.post("/addOwnTicket", isLoggedIn, ticketController.addOwnTicket);
router.post("/addPartnerTicket", isLoggedIn, ticketController.addPartnerTicket);
module.exports = router;
