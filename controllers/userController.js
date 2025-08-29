const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("users/index", {
    title: "Quản lý Users",
    cssFile: "breadcrumb.css",
  });
};

exports.fetchUserData = async (req, res) => {
  try {
    const results = await query(
      "SELECT u.*, d.name AS department_name FROM users u LEFT JOIN departments d ON u.department_id = d.id"
    );
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi truy vấn Database" });
  }
};

exports.fetchUserDetail = async (req, res) => {
  const user_id = req.params;
  try {
    const results = await query(`SELECT * FROM users WHERE id = ?`, [user_id]);
    if (results.length === 0) {
      res
        .status(500)
        .json({ success: false, message: "Không tìm thấy thông tin user" });
    } else {
      res.json({ success: true, data: results[0] });
    }
  } catch (err) {
    res.json({ success: false, message: "Lỗi truy vấn dữ liệu" });
  }
};
