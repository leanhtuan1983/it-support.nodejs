const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("tickets/index", {
    title: "Tickets",
    cssFiles: ["breadcrumb.css"],
  });
};

exports.fetchTicketData = async (req, res) => {
  try {
    const results = await query(`SELECT 
        t.id, 
        t.computer_id, 
        t.owner_user_id AS owner, 
        t.reported_by_user_id AS reported_by, 
        t.descriptions,
        t.type,
        t.created_at, 
        t.status
            FROM tickets t INNER JOIN computers c ON t.computer_id = c.id
            INNER JOIN users u ON t.owner_user_id = u.id AND t.reported_by_user_id = u.id
            `);
    res.json({ success: true, data: results });
  } catch (error) {
    console.error("Lỗi truy vấn dữ liệu:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi kết truy vấn database" });
  }
};

exports.addOwnTicket = async (req, res) => {
  const { computer_id, type, descriptions } = req.body;
  const user_id = req.session.user.id; // Lấy ID user đang đăng nhập

  // Kiểm tra session hoặc dữ liệu bị thiếu
  if (!user_id || !computer_id || !type || !descriptions) {
    return res.status(400).json({
      success: false,
      message: "Thiếu thông tin cần thiết hoặc chưa đăng nhập",
    });
  }

  try {
    await query(
      `INSERT INTO tickets 
        (computer_id, owner_user_id, reported_by_user_id, type, descriptions, created_at, status)
       VALUES (?,?,?,?,?,NOW(),?)`,
      [computer_id, user_id, user_id, type, descriptions, 0]
    );

    res.json({ success: true, message: "Gửi yêu cầu thành công" });
  } catch (err) {
    console.error("Có lỗi khi gửi yêu cầu:", err);
    res.status(500).json({ success: false, message: "Gửi yêu cầu thất bại" });
  }
};

exports.addPartnerTicket = async (req, res) => {
  const { computer_id, owner_user_id, type, descriptions } = req.body;
  const reporter_id = req.session.user.id;

  // Kiểm tra đầu vào
  if (
    !reporter_id ||
    !computer_id ||
    !owner_user_id ||
    !type ||
    !descriptions
  ) {
    return res.status(400).json({
      success: false,
      message: "Thiếu thông tin cần thiết hoặc chưa đăng nhập",
    });
  }

  try {
    await query(
      `INSERT INTO tickets (computer_id, owner_user_id, reported_by_user_id, type, descriptions, created_at, status)
       VALUES (?,?,?,?,?,NOW(),?)`,
      [computer_id, owner_user_id, reporter_id, type, descriptions, 0]
    );

    res.json({ success: true, message: "Gửi yêu cầu thành công" });
  } catch (err) {
    console.error("Có lỗi khi gửi yêu cầu:", err);
    res.status(500).json({ success: false, message: "Gửi yêu cầu thất bại" });
  }
};

exports.getNewestTicket = async (req, res) => {
  try {
    const results = await query(
      `SELECT c.name AS computer_name, u.name AS owner_name, t.type, t.descriptions, t.created_at, t.status 
         FROM tickets t INNER JOIN computers c ON t.computer_id = c.id
         INNER JOIN users u ON t.owner_user_id = u.id`
    );
    res.json({ success: true, data: results });
  } catch (err) {
    console.error("Có lỗi khi tải danh sách:", err);
    res.status(500).json({ success: false, message: "Tải danh sách thất bại" });
  }
};
