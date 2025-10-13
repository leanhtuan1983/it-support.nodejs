exports.isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.status(403).send("Bạn không có quyền truy cập (admin only)");
};

exports.isITStaff = (req, res, next) => {
  if (req.session.user && req.session.user.role === "it_staff") {
    return next();
  }
  return res.status(403).send("Bạn không có quyền truy cập (IT Staff only)");
};

exports.isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === "user") {
    return next();
  }
  return res.status(403).send("Bạn không có quyền truy cập (user only)");
};

exports.allowRoles = function (roles = []) {
  return function (req, res, next) {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const userRole = req.session.user.role;

    if (roles.includes(userRole)) {
      return next();
    }

    return res.status(403).send("Access denied");
  };
};
