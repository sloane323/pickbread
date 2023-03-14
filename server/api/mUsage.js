const pool = require("../config/db");

/** 원자재사용량 POST */
const postMUsage = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 원자재사용량 VALUES (?, ?, ?, ?)";
    const usageId = Math.random().toString(32).slice(2);
    const { manufactureId, selectedMaterialStockId, materialUsage } = req.body;
    const params = [usageId, manufactureId, selectedMaterialStockId, materialUsage];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { postMUsage };
