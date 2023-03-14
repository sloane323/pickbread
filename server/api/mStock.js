const pool = require("../config/db");

/** 원자재재고 GET */
const getMStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 원자재재고";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재재고 특정 ID GET */
const getSingleMStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `SELECT DISTINCT 원자재재고.*, (SELECT 현재가격 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 현재가격, (SELECT 기준가격 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 기준가격, (SELECT 카테고리 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 카테고리, (SELECT 유효기한 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 유효기한, (SELECT 브랜드 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 브랜드, (SELECT 낱개바코드 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 낱개바코드, (SELECT 박스바코드 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 박스바코드, (SELECT 원산지 FROM 원자재 WHERE 원자재.원자재ID = 원자재재고.원자재ID) AS 원산지 FROM 원자재재고 WHERE 원자재ID=?`;
    const id = req.params.id;
    const params = [id];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재재고 POST */
const postMStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 원자재재고 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const { stockID, purchasingID, materialID, name, size, amount, balance, unit, expDate } = req.body;
    const params = [stockID, purchasingID, materialID, name, size, amount, balance, unit, expDate, false];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

const putMStockByManufacture = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "UPDATE 원자재재고 SET 잔량 = 잔량 - ?, 폐기여부 = 폐기여부 + ? WHERE 재고ID = ?";
    const { materialUsage, materialDispose, selectedMaterialStockId } = req.body;
    const params = [materialUsage, materialDispose, selectedMaterialStockId];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 원자재재고 수동 폐기 및 폐기 취소 */
const disposeMStock = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { id } = req.params;
    const dispose = req.body.dispose;
    const sql = `UPDATE 원자재재고 SET 폐기여부=${!dispose} WHERE 재고ID = "${id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
}

module.exports = { getMStock, getSingleMStock, postMStock, putMStockByManufacture, disposeMStock };
