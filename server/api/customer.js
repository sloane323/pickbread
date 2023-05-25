const pool = require("../config/db");

/** 고객 GET(search 포함) */
const getCustomers = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const resultsPerPage = 5;
    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * resultsPerPage;
    let sql = `SELECT DISTINCT 고객.*, (SELECT SUM(포인트) FROM 포인트 WHERE 고객.고객ID = 포인트.고객ID) AS 포인트,
      (SELECT CEIL(COUNT(*) / ${resultsPerPage}) FROM 고객) AS 페이지수 FROM 고객 ORDER BY 이름
      LIMIT ${resultsPerPage} OFFSET ${offset}`;
    if (req.query.search) {
      sql = `SELECT DISTINCT 고객.*, (SELECT SUM(포인트) FROM 포인트 WHERE 고객.고객ID = 포인트.고객ID) AS 포인트,
        (SELECT CEIL(COUNT(*) / ${resultsPerPage}) FROM 고객 WHERE 이름 = '${req.query.search}') AS 페이지수
        FROM 고객 WHERE 이름 = '${req.query.search}'
        ORDER BY 이름 LIMIT ${resultsPerPage} OFFSET ${offset}`;
    }
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 고객 GET 판매에 붙여오기 */
const getCustomerById = (req, res) => {
  const selectedIds = req.query.selectedIds.split(',');
  const placeholders = selectedIds.map(() => '?').join(',');
  const sql = `
    SELECT 고객ID, 이름, SUM(포인트) AS 포인트
    FROM 고객
    LEFT JOIN 포인트 ON 고객.고객ID = 포인트.고객ID
    WHERE 고객.고객ID IN (${placeholders})
    GROUP BY 고객ID, 이름
  `;
  const values = selectedIds;

  pool.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(sql, values, (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    });

    conn.release();
  });
};

/** 고객 POST */
const postCustomer = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 고객 VALUES(?, ?, ?, ?,?)";
    const { customerId, name, phone, comment, time } = req.body;
    const params = [customerId, name, phone, comment, time];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 고객 PUT */
const putCustomer = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "UPDATE 고객 SET 이름 = ?, 전화번호 = ?, 코멘트 = ? WHERE 고객ID = ?";
    const { name, phone, comment } = req.body;
    const { id, createtime } = req.params;
    const params = [name, phone, comment, id];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 고객 DELETE */
const deleteCustomer = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `DELETE FROM 고객 WHERE 고객ID = "${req.body.id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
}

module.exports = { getCustomers, postCustomer, putCustomer, deleteCustomer,getCustomerById };
