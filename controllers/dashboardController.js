const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("dashboard/index", {
    title: "Dashboard",
    cssFiles: ["breadcrumb.css"],
  });
};

exports.totalEq = async (req, res) => {
  try {
    const totalEq = await query("SELECT COUNT(id) AS total FROM computers");
    res.json({ success: true, data: totalEq[0].total });
  } catch (err) {
    console.error("Lỗi truy vấn dữ liệu:", err);
    res.status(500).json({ success: false, message: "Lỗi truy vấn database" });
  }
};

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
