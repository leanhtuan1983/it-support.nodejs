const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("departments/index", {
    title: "Quản lý Departments",
    cssFile: "breadcrumb.css",
  });
};

exports.fetchDeptData = async (req, res) => {
  try {
    const results = await query("SELECT * FROM departments");
    res.json({ success: true, data: results });
  } catch (err) {
    res.json({ success: false, message: "Lỗi kết nối server" });
  }
};
