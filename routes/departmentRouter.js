const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const departmentController = require("../controllers/departmentController");

router.get("/", departmentController.index);
router.get("/fetchDeptData", departmentController.fetchDeptData);
module.exports = router;
