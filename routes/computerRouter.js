const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const computerController = require("../controllers/computerController");

router.get("/", computerController.index);
module.exports = router;
