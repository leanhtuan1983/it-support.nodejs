const express = require("express");
const router = express.Router();
// const middlewares_auth = require('../middlewares/auth.js');
const computerController = require("../controllers/computerController");

router.get("/", computerController.index);
router.get("/fetchComputerData", computerController.fetchComputerData);
router.post("/addComputer", computerController.addComputer);

// Lấy danh sách computer theo tài khoản đăng nhập
router.get(
  "/getComputerListByUserId",
  computerController.getComputerListByUserId
);

// Lấy danh sách computer theo select user
router.get(
  "/fetchComputerBySelectedUser/:id",
  computerController.fetchComputerBySelectedUser
);
router.get("/getUserByDept/:id", computerController.fetchUserByDept);
router.get("/getComputerInfo/:id", computerController.getComputerInfo);
router.put("/update/:id", computerController.updateComputer);
router.delete("/delete/:id", computerController.deleteComputer);
module.exports = router;
