const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("computers/index", {
    title: "Quản lý Computers",
    cssFiles: ["breadcrumb.css", "computerTable.css"],
  });
};

exports.fetchComputerData = async (req, res) => {
  try {
    const results = await query(
      `SELECT 
        c.id AS computer_id, c.name, c.location, 
        u.id AS user_id, u.name AS username, 
        d.id AS department_id, d.name AS department_name
      FROM computers c
      INNER JOIN users u ON c.user_id = u.id
      INNER JOIN departments d ON u.department_id = d.id`
    );
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Lỗi truy vấn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn CSDL" });
  }
};

exports.fetchUserByDept = async (req, res) => {
  try {
    const { id } = req.params;
    const userList = await query(
      "SELECT id, name FROM users WHERE department_id = ?",
      [id]
    );
    res.json({ success: true, data: userList });
  } catch (err) {
    console.error("Lỗi tải danh sách users:", err);
    res.status(500).json({ success: false, message: "Lỗi tải dữ liệu" });
  }
};

exports.addComputer = async (req, res) => {
  const { name, location, user_id } = req.body;
  try {
    await query(
      "INSERT INTO computers (name, location, user_id) VALUES (?, ?, ?)",
      [name, location, user_id]
    );
    res.json({ success: true, message: "Thêm thành công" });
  } catch (err) {
    console.error("Lỗi thêm mới dữ liệu:", err);
    res
      .status(500)
      .json({ success: false, message: "Đã có lỗi khi thêm mới dữ liệu" });
  }
};

exports.getComputerInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query(
      `SELECT  c.*, u.name AS username, d.id AS department_id, d.name AS department_name
    FROM computers c INNER JOIN users u ON c.user_id = u.id
    INNER JOIN departments d ON u.department_id = d.id
    WHERE c.id = ?`,
      [id]
    );
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy thông tin" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Lỗi tải dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi kết nối dữ liệu" });
  }
};

exports.updateComputer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, user_id } = req.body;

    if (!name || !location || !user_id) {
      return res.json({ success: false, message: "Thiếu thông tin cập nhật" });
    }
    await query(
      `UPDATE computers SET
      name = ?, location = ?, user_id = ?
      WHERE id = ?`,
      [name, location, user_id, id]
    );
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi kết nối cơ sở dữ liệu" });
  }
};

exports.deleteComputer = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query("SELECT id FROM computers WHERE id = ?", [id]);
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy dữ liệu" });
    }
    await query("DELETE FROM computers WHERE id = ?", [id]);
    res.json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    console.error("Lỗi xóa dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi xóa dữ liệu" });
  }
};
// Lấy danh sách computer theo tài khoản đăng nhập
exports.getComputerListByUserId = async (req, res) => {
  try {
    const user_id = req.session.user.id; // lấy id từ session
    const results = await query("SELECT * FROM computers WHERE user_id = ?", [
      user_id,
    ]);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Lỗi truy vấn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn dữ liệu" });
  }
};
// Lấy danh sách computer cho người khác
exports.fetchComputerBySelectedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const computerList = await query(
      "SELECT id, name FROM computers WHERE user_id = ?",
      [id]
    );
    res.json({ success: true, data: computerList });
  } catch (err) {
    console.error("Lỗi tải danh sách users:", err);
    res.status(500).json({ success: false, message: "Lỗi tải dữ liệu" });
  }
};
