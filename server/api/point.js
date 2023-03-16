const pool = require("../config/db");

/** 신규 가입 회원 포인트 자동 등록 */
const postNewPoint = (req, res) => {
  pool.getConnection((err, conn) => {
    console.log("포인트 실행");
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 포인트 (포인트ID, 고객ID, 내용, 포인트) VALUES(?, ?, ?, ?)";
      const point = 1000;
      const id = Math.random().toString(32).slice(2);
      const customerId = req.body.customerId;
      const content = "신규 등록";
      const params = [id, customerId, content, point];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log("등록성공");
        console.log(err);
      });
      conn.release();
    }
  });
};

/** 특정 회원의 포인트 수동 변경*/
const adjustPoint = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 포인트 (포인트ID, 고객ID, 내용, 포인트) VALUES (?, ?, ?, ?)";
    const pointId = Math.random().toString(32).slice(2);
    const customerId = req.params.id;
    const content = "수동 등록";
    const point = Number(req.body.point) - Number(req.body.포인트);
    const params = [pointId, customerId, content, point];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

const getPointLogByCustomerId = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { id } = req.params;
    const sql = `SELECT 포인트.포인트ID, 포인트.고객ID, 고객.이름, 포인트.내용, 포인트.포인트, 포인트.생성시간 FROM 포인트
    LEFT JOIN 고객 ON 포인트.고객ID = 고객.고객ID
    WHERE 포인트.고객ID = "${id}" AND 포인트 != 0
    ORDER BY 생성시간 DESC`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { postNewPoint, adjustPoint, getPointLogByCustomerId };
