const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const computerController = require("../controllers/computerController");

router.get("/", computerController.index);
router.get("/fetchComputerData", computerController.fetchComputerData);
router.post("/addComputer", computerController.addComputer);
router.get(
  "/getComputerListByUserId",
  computerController.getComputerListByUserId
);
router.get("/getUserByDept/:id", computerController.fetchUserByDept);
router.get("/getComputerInfo/:id", computerController.getComputerInfo);
router.put("/update/:id", computerController.updateComputer);
router.delete("/delete/:id", computerController.deleteComputer);
module.exports = router;
