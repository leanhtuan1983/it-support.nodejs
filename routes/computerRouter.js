const express = require("express");
const router = express.Router();

const computerController = require("../controllers/computerController");

const {
  isLoggedIn,
  isAdmin,
  isITStaff,
  isUser,
  allowRoles,
} = require("../middlewares/authMiddleware");

// Hiển thị trang quản lý computers
router.get("/", isLoggedIn, isAdmin, computerController.index);

// Lấy danh sách computers
router.get(
  "/fetchComputerData",
  isLoggedIn,
  computerController.fetchComputerData
);

// Thêm mới computer
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

// Lấy danh sách user theo bộ phận
router.get(
  "/getUserByDept/:id",
  isLoggedIn,
  computerController.fetchUserByDept
);

// Lấy thông tin computer
router.get(
  "/getComputerInfo/:id",
  isLoggedIn,
  computerController.getComputerInfo
);

// Cập nhật thông tin computer
router.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  computerController.updateComputer
);

// Xóa computer
router.delete(
  "/delete/:id",
  isLoggedIn,
  isAdmin,
  computerController.deleteComputer
);
module.exports = router;
