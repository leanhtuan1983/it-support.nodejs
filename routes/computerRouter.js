const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const computerController = require("../controllers/computerController");

router.get("/", computerController.index);
router.get("/fetchComputerData", computerController.fetchComputerData);
router.post("/addComputer", computerController.addComputer);
router.get("/getUserByDept/:id", computerController.fetchUserByDept);
module.exports = router;
