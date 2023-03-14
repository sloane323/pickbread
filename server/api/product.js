const pool = require("../config/db");

/** 제품 GET */
const getProduct = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 제품";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품 GET(/api/production) */
const getProduction = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 제품 ORDER BY 이름";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품 search */
const searchProduct = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { searchQuery } = req.params;
    const sql = `SELECT * FROM 제품 WHERE 이름 LIKE "%${searchQuery}%"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품 POST */
const postProduct = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 제품 VALUES(?, ?, ?, ?, ?)";
    const { productId, name, size, unit, price } = req.body;
    const params = [productId, name, size, unit, price];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 제품 DELETE */
const deleteProduct = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `DELETE FROM 제품 WHERE 제품ID = "${req.body.id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { getProduct, searchProduct, getProduction, postProduct, deleteProduct };
