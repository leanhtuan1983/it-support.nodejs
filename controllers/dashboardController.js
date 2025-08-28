const db = require("../config/db");

exports.index = (req, res) => {
  res.render("dashboard/index", { title: "Dashboard" });
};
