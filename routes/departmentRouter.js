const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const departmentController = require("../controllers/departmentController");

router.get("/", departmentController.index);
router.get("/fetchDeptData", departmentController.fetchDeptData);
router.post("/addDept", departmentController.addDept);
router.get("/getDept/:id", departmentController.getDeptById);
router.put("/update/:id", departmentController.updateDept);
router.delete("/delete/:id", departmentController.delete);

module.exports = router;
