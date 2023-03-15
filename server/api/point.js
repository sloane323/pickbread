const pool = require("../config/db");

/** 신규 가입 회원 포인트 자동 등록 */
const postNewPoint = (req, res) => {
  pool.getConnection((err, conn) => {
    console.log("포인트 실행");
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 포인트 VALUES(?, ?, null, ?, ?)";
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
    const sql = "INSERT INTO 포인트 VALUES (?, ?, ?, ?, ?)";
    const pointId = Math.random().toString(32).slice(2);
    const customerId = req.params.id;
    const content = "수동 등록";
    const point = Number(req.body.point) - Number(req.body.포인트);
    const params = [pointId, customerId, null, content, point];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
}

module.exports = { postNewPoint, adjustPoint };
