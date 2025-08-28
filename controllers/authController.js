const db = require("../config/db");

exports.loginForm = (req, res) => {
  res.render("auth/login", { title: "ĐĂNG NHẬP", layout: false });
};
