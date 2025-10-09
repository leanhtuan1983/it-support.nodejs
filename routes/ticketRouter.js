const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const ticketController = require("../controllers/ticketController");

router.get("/", ticketController.index);
router.post("/addOwnTicket", ticketController.addOwnTicket);
module.exports = router;
