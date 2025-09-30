const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("users/index", {
    title: "Quản lý Computers",
    cssFiles: ["breadcrumb.css"],
  });
};

// Lấy danh sách Users
exports.fetchUserData = async (req, res) => {
  try {
    const results = await query(
      `SELECT u.id, u.name, u.email, u.role, d.name AS department_name 
       FROM users u 
       LEFT JOIN departments d ON u.department_id = d.id`
    );
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Lỗi fetchUserData:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn Database" });
  }
};

// Thêm User
exports.addUser = async (req, res) => {
  try {
    const { name, password, email, role, department_id } = req.body;
    if (!name || !password || !email || !department_id) {
      return res.json({
        success: false,
        message: "Không được để trống các thông tin chính",
      });
    }
    await query(
      "INSERT INTO users (name, password, email, role, department_id) VALUES (?,?,?,?,?)",
      [name, password, email, role, department_id]
    );
    res.json({ success: true, message: "Thêm mới user thành công" });
  } catch (err) {
    console.error("Lỗi thêm mới user:", err);
    res
      .status(500)
      .json({ success: false, message: "Có lỗi xảy ra khi thêm user" });
  }
};

// Lấy thông tin chi tiết 1 User
exports.fetchUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query(
      `SELECT u.id, u.name, u.password, u.email, u.role, d.id AS department_id, d.name AS department_name
       FROM users u 
       LEFT JOIN departments d ON u.department_id = d.id  
       WHERE u.id = ?`,
      [id]
    );
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy thông tin user" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Lỗi fetchUserDetail:", err);
    res.status(500).json({ success: false, message: "Lỗi kết nối dữ liệu" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, email, role, department_id } = req.body;
    if (!name || !email || !role || !department_id) {
      return res.json({ success: false, message: "Thiếu thông tin cập nhật" });
    }
    await query(
      `UPDATE users 
       SET name = ?, password = ?, email = ?, role = ?, department_id = ? 
       WHERE id = ?`,
      [name, password, email, role, department_id, id]
    );
    res.json({ success: true, message: "Cập nhật user thành công" });
  } catch (err) {
    console.error("Lỗi updateUser:", err);
    res
      .status(500)
      .json({ success: false, message: "Có lỗi khi cập nhật user" });
  }
};

// Xóa User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query("SELECT id FROM users WHERE id = ?", [id]);
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User không tồn tại" });
    }
    await query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ success: true, message: "Xóa user thành công" });
  } catch (err) {
    console.error("Lỗi deleteUser:", err);
    res.status(500).json({ success: false, message: "Có lỗi khi xóa user" });
  }
};


