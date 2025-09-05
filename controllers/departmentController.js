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

exports.addDept = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.json({
        success: false,
        message: "Tên department không được để trống",
      });
    }

    await query("INSERT INTO departments (name) VALUES (?)", [name.trim()]);
    res.json({ success: true, message: "Thêm department thành công" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Có lỗi xảy ra khi thêm department" });
  }
};

exports.getDeptById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query("SELECT * FROM departments WHERE id = ?", [id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy department tương ứng",
      });
    }

    // Trả về đúng object 
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

exports.updateDept = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.res
        .status(400)
        .json({ success: false, message: "Tên phòng ban không được để trống" });
    }

    const [check] = await query("SELECT * FROM departments WHERE id = ?", [id]);
    if (!check || check.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy phòng ban để cập nhật",
      });
    }

    await query("UPDATE departments SET name = ? WHERE id = ?", [name, id]);
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("Lối update:", err);
    res.status(500).json({ success: false, message: "Lỗi kết nối server" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const [check] = await query("SELECT * FROM departments WHERE id = ?", [id]);
    if (!check || check.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dữ liệu",
      });
    }
    await query("DELETE FROM departments WHERE id = ?", [id]);
    res.json({ success: true, message: "Xóa thành công!" });
  } catch (err) {
    console.error("Lỗi xóa dữ liệu", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
