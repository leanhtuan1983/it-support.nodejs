const { query } = require("../helpers/dbHelper");
// const bcrypt = require("bcrypt");

exports.loginForm = (req, res) => {
  res.render("auth/login", { title: "ĐĂNG NHẬP", layout: false });
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const results = await query("SELECT * FROM users WHERE name = ?", [
      username,
    ]);

    if (results.length === 0) {
      return res.render("auth/login", {
        title: "Đăng nhập",
        layout: false,
        error: "Tài khoản không tồn tại",
      });
    }
    const user = results[0];

    if (password !== user.password) {
      return res.render("auth/login", {
        title: "Đăng nhập",
        layout: false,
        error: "Sai mật khẩu",
      });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Lỗi truy vấn database:", err);
    res.status(500).send("Lỗi truy vấn database");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error("Lỗi xóa session:", err);
    res.redirect("/login");
  });
};
