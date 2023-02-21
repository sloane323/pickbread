const pool = require("../config/db");

const getVendors = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 벤더 ORDER BY 이름";
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};
module.exports = getVendors

