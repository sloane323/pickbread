const pool = require("../config/db");

/** 벤더 GET(search 포함) */
const getVendors = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { page, result, search } = req.query;
    let sql = "SELECT * FROM 벤더 order by 이름";
    if (page && result) {
      const offset = (page - 1) * result;
      sql = `SELECT *, (SELECT COUNT(*) FROM 벤더) AS 카운터 FROM 벤더 ORDER BY 이름 LIMIT ${result} OFFSET ${offset}`;
      if (search) {
        sql = `SELECT *, (SELECT COUNT(*) FROM 벤더 WHERE 이름 LIKE "%${search}%" OR 전화번호 LIKE "%${search}%") AS 카운터 FROM 벤더
        WHERE 이름 LIKE "%${search}%" OR 전화번호 LIKE "%${search}%" ORDER BY 이름 LIMIT ${result} OFFSET ${offset};`;
      }
    }
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 벤더 POST */
const postVendor = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 벤더 VALUES(?, ?, ?, ?, ?)";
    const id = Math.random().toString(32).slice(2);
    const { name, phone, manager, comment } = req.body;
    const params = [id, name, phone, manager, comment];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 벤더 PUT */
const putVendor = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `UPDATE 벤더 SET 이름 = ?, 전화번호 = ?, 담당자 = ?, 코멘트 = ? WHERE 벤더ID = ?`;
    const { 벤더ID, 이름, 전화번호, 담당자, 코멘트 } = req.body;
    const parmas = [이름, 전화번호, 담당자, 코멘트, 벤더ID];
    conn.query(sql, parmas, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 벤더 DELETE */
const deleteVendor = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "DELETE FROM 벤더 WHERE 벤더ID = ?";
    const id = req.body.id;
    conn.query(sql, [id], (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    });
    conn.release();
  });
};

module.exports = { getVendors, postVendor, putVendor, deleteVendor };
