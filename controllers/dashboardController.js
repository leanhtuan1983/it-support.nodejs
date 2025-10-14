const { query } = require("../helpers/dbHelper");
// Hiển thị trang index
exports.index = (req, res) => {
  res.render("dashboard/index", {
    title: "Dashboard",
    cssFiles: ["breadcrumb.css"],
  });
};

// Tổng số thiết bị
exports.totalEq = async (req, res) => {
  try {
    const totalEq = await query("SELECT COUNT(id) AS total FROM computers");
    res.json({ success: true, data: totalEq[0].total });
  } catch (err) {
    console.error("Lỗi truy vấn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn database" });
  }
};

// Số lượng thiết bị đang sử dụng
exports.eqInUse = async (req, res) => {
  try {
    const eqInUse = await query(
      "SELECT COUNT(id) AS eqInUse FROM computers WHERE location NOT IN ('Equipment Storage')"
    );
    res.json({ success: true, data: eqInUse[0].eqInUse });
  } catch (err) {
    console.error("Lỗi truy vấn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn database" });
  }
};

// Số lượng ticket y/c sửa chữa
exports.repairReqTicket = async (req, res) => {
  try {
    const repairReq = await query(
      "SELECT COUNT(id) AS repair_req FROM tickets WHERE type = 1"
    );
    res.json({ success: true, data: repairReq[0].repair_req });
  } catch (err) {
    console.error("Lỗi truy vẫn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn database" });
  }
};

// Số lượng ticket y/c cài đặt
exports.setupReqTicket = async (req, res) => {
  try {
    const setupReq = await query(
      "SELECT COUNT(id) AS setup_req FROM tickets WHERE type = 2"
    );
    res.json({ success: true, data: setupReq[0].setup_req });
  } catch (err) {
    console.error("Lỗi truy vẫn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn database" });
  }
};

// Danh sách ticket của người đang đăng nhập
exports.getTicketInfoOfCurrentLoginUser = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const results = await query(
      `SELECT c.name AS computer_name, t.descriptions,  u.name AS reported_by, t.created_at, t.status 
      FROM tickets t INNER JOIN computers c ON t.computer_id = c.id 
      INNER JOIN users u ON t.reported_by_user_id = u.id WHERE t.owner_user_id = ?`,
      [user_id]
    );
    // console.log(results);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Lỗi truy vấn dữ liệu:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi kết truy vấn database" });
  }
};

