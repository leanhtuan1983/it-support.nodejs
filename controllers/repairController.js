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

// Lấy danh sách ticket đăng ký của it_staff đăng nhập
exports.getAssignedTicketOfCurrentLoggedInITStaff = async (req, res) => {
  try {
    const id = req.session.user.id;
    const results = await query(
      `SELECT r.id AS repair_id, t.id AS ticket_id, c.name AS computer_name, t.type 
      FROM repairs r INNER JOIN tickets t ON r.ticket_id = t.id
      INNER JOIN computers c ON t.computer_id = c.id WHERE r.user_id = ?`,
      [id]
    );
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Lỗi fetch dữ liệu:", err);
    res.json({ success: false, message: "Lỗi kết nối server" });
  }
};

// Admin phân công người xử lý
exports.assignedByAdmin = async (req, res) => {};

// IT Staff tự nhận xử lý ticket
exports.assignedByItStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const it_staff_id = req.session.user.id;

    // Kiểm tra ticket tồn tại
    const [ticket] = await query("SELECT * FROM tickets WHERE id = ?", [id]);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy ticket trên hệ thống",
      });
    }
    // Kiểm tra đã có ai nhận chưa
    const [exist] = await query("SELECT * FROM repairs WHERE ticket_id = ?", [
      id,
    ]);
    if (exist) {
      return res.json({
        success: false,
        message: "Ticket này đã được nhận bởi người khác.",
      });
    }

    // Ghi nhận người nhận việc
    await query("INSERT INTO repairs(ticket_id, user_id) VALUES (?,?)", [
      id,
      it_staff_id,
    ]);

    // Cập nhật trạng thái ticket
    await query("UPDATE tickets SET status = 1 WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Bạn đã nhận xử lý ticket này!",
      nextStatus: 1,
    });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi đăng ký công việc",
    });
  }
};

// Cập nhật trạng thái hoàn thành Ticket (dành cho IT)
exports.updateTask = async (req, res) => {
  try {
    const { id, causes, solutions } = req.body;
    const it_staff_id = req.session.user.id;
    // Kiểm tra tồn tại ticket trong bảng repairs
    const [ticket] = await query("SELECT * FROM repairs WHERE id = ?", [id]);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy ticket trên hệ thống",
      });
    }
    // Cập nhật nguyên nhân và cách xử lý của ticket trong bảng repairs
    await query(
      "UPDATE repairs SET (causes, solutions, repaired_at) = (?,?, NOW()) WHERE id = ?",
      [causes, solutions, id]
    );
    // Cập nhật trạng thái của ticket trong bảng tickets
    await query("UPDATE tickets SET status = 2 WHERE id = ?", [id.ticket_id]);
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi cập nhật thông tin",
    });
  }
};
