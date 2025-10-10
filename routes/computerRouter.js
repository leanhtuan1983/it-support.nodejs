const express = require("express");
const router = express.Router();

const computerController = require("../controllers/computerController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
} = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, isAdmin, computerController.index);
router.get(
  "/fetchComputerData",
  isLoggedIn,
  computerController.fetchComputerData
);
router.post(
  "/addComputer",
  isLoggedIn,
  isAdmin,
  computerController.addComputer
);

// Lấy danh sách computer theo tài khoản đăng nhập
router.get(
  "/getComputerListByUserId",
  isLoggedIn,
  computerController.getComputerListByUserId
);

// Lấy danh sách computer theo select user
router.get(
  "/fetchComputerBySelectedUser/:id",
  isLoggedIn,
  computerController.fetchComputerBySelectedUser
);
router.get(
  "/getUserByDept/:id",
  isLoggedIn,
  computerController.fetchUserByDept
);
router.get(
  "/getComputerInfo/:id",
  isLoggedIn,
  computerController.getComputerInfo
);
router.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  computerController.updateComputer
);
router.delete(
  "/delete/:id",
  isLoggedIn,
  isAdmin,
  computerController.deleteComputer
);
module.exports = router;
