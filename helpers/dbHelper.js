// helpers/dbHelper.js
const db = require("../config/db");

// Hàm query sử dụng Promise
function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = { query };
