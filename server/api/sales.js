const pool = require("../config/db");

const postSales = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 판매 VALUES (?,?,?,?,?)";
    const { salesID, customerId, salesDate, totalPrice, totalCost } = req.body;
    const params = [salesID, customerId, salesDate, totalPrice, totalCost];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { postSales };
