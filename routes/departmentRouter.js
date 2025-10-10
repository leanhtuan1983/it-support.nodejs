const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const departmentController = require("../controllers/departmentController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, isAdmin, departmentController.index);
router.get("/fetchDeptData", isLoggedIn, departmentController.fetchDeptData);
router.post("/addDept", isLoggedIn, isAdmin, departmentController.addDept);
router.get("/getDept/:id", isLoggedIn, departmentController.getDeptById);
router.put("/update/:id", isLoggedIn, isAdmin, departmentController.updateDept);
router.delete("/delete/:id", isLoggedIn, isAdmin, departmentController.delete);

module.exports = router;
