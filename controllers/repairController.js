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
exports.getClaimTicketOfCurrentLoggedInITStaff = async (req, res) => {};

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
    console.log(id);
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
