const pool = require("../config/db");

/** 제품생산 GET */
const getManufacture = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 제품생산";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품생산 POST */
const postManufacture = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 제품생산 VALUES (?, ?, ?, ?)";
    const { manufactureId, selectedProductionId, enteredAmount, manufactureDate } = req.body;
    const params = [manufactureId, selectedProductionId, enteredAmount, manufactureDate];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { getManufacture, postManufacture };
