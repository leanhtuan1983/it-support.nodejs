const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("repairs/index", {
    title: "Quản lý thông tin sửa chữa",
    cssFiles: ["breadcrumb.css"],
  });
};

exports.fetchRepairList = async (req, res) => {
  try {
    const results = await query("SELECT * FROM repairs");
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Lỗi fetch dữ liệu:", err);
    res.json({ success: false, message: "Lỗi kết nối server" });
  }
};

// Admin phân công người xử lý
exports.assignedByAdmin = async (req, res) => {};

// It staff tự nhận việc xử lý
exports.assignedByItStaff = async (req, res) => {};
