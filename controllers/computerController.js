const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("computers/index", {
    title: "Quản lý Users",
    cssFile: "breadcrumb.css",
  });
};
