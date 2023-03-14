const pool = require("../config/db");

/** 제품재고 GET */
const getPStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT DISTINCT 제품.*, (SELECT SUM(잔량) FROM 제품재고 WHERE 제품.제품ID = 제품재고.제품ID) AS 재고 FROM 제품;";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품재고 ID를 통한 GET */
const getSinglePStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql =
      "SELECT 제품.*, 제품재고.재고ID, 제품재고.잔량, 제품재고.유통기한, 제품재고.폐기여부 FROM 제품 LEFT JOIN 제품재고 ON 제품.제품ID = 제품재고.제품ID WHERE 제품.제품ID = ? ORDER BY 유통기한";
    const id = req.params.id;
    const params = [id];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품재고 search */
const searchPStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { searchQuery } = req.params;
    const sql = `SELECT DISTINCT 제품.*, (SELECT SUM(잔량) FROM 제품재고 WHERE 제품.제품ID = 제품재고.제품ID) AS 재고 FROM 제품 WHERE 이름 LIKE "%${searchQuery}%"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품재고 POST */
const postPStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 제품재고 VALUES (?, ?, ?, ?, ?, ?)";
    const { productStockId, manufactureId, selectedProductionId, presentAmount, expiryDate, productDispose } = req.body;
    const params = [productStockId, manufactureId, selectedProductionId, presentAmount, expiryDate, productDispose];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 판매를 통한 재품재고 감소 PUT */
const putPStockBySales = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { id, amount } = req.body;
    const sql = `UPDATE 제품재고 SET 잔량=잔량-${amount} WHERE 제품ID = "${id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품재고 폐기 */
const disposePStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { id } = req.params;
    const { dispose } = req.body;
    console.log(dispose)
    const sql = `UPDATE 제품재고 SET 폐기여부=${!dispose} WHERE 재고ID = "${id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { getPStock, getSinglePStock, searchPStock, putPStockBySales, disposePStock, postPStock };
