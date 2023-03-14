const pool = require("../config/db");

/** 원자재 구매 GET */
const getPurchasing = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 원자재구매 LEFT JOIN 벤더 ON 원자재구매.벤더ID = 벤더.벤더ID ORDER BY 구매일 DESC";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재구매 search */
const searchPurchasing = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { searchQuery } = req.params;
    const sql = `SELECT * FROM 원자재구매 LEFT JOIN 벤더 ON 원자재구매.벤더ID = 벤더.벤더ID WHERE 이름 LIKE "%${searchQuery}%" ORDER BY 구매일 DESC`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재구매 POST */
const postPurchasing = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    // 영수증(이미지 파일) 추가 필요
    const sql = "INSERT INTO 원자재구매 VALUES (?, ?, ?, ?, ?, ?, null)";
    const { purchasingID, vendorID, purchaseDate, prevCost, discount, totalCost } = req.body;
    const params = [purchasingID, vendorID, purchaseDate, prevCost, discount, totalCost];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { getPurchasing, searchPurchasing, postPurchasing };
