const pool = require("../config/db");

/** 원자재 GET */
const getMaterials = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT DISTINCT 원자재.*, (SELECT SUM(잔량) FROM 원자재재고 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 재고 FROM 원자재;";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재 POST */
const postMaterial = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `INSERT INTO 원자재 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const id = Math.random().toString(32).slice(2);
    const { name, size, unit, price, defaultPrice, category, expiryDate, brand, pcsBarcode, boxBarcode, origin } = req.body;
    const params = [id, name, size, unit, price, defaultPrice, category, expiryDate, brand, pcsBarcode, boxBarcode, origin];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재 조회 */
const searchMaterial = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { searchQuery } = req.params;
    const sql = `SELECT DISTINCT 원자재.*, (SELECT SUM(잔량) FROM 원자재재고 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 재고 FROM 원자재 WHERE 이름 LIKE "%${searchQuery}%"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { getMaterials, postMaterial, searchMaterial };
