const { query } = require("../helpers/dbHelper");

exports.index = (req, res) => {
  res.render("repairs/index", {
    title: "Quản lý thông tin sửa chữa",
    cssFiles: ["breadcrumb.css"],
  });
};
