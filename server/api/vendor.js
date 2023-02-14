const pool = require('../config/db')
exports.getVendors = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 벤더";
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
};