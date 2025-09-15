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
