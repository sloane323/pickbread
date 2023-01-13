/* server/server.js */

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const pool = require("./config/db");

/* localhost:4000에 접근하면 res.send를 통해 문구를 적고 있다. */
app.get("/", (req, res) => {
  console.log(res)
  res.send(`Response Complete`);
});

app.get("/api/users", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query("SELECT * FROM users", (err, rows, fields) => {
        res.send(rows);
      });
    }
    conn.release();
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/material', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = `INSERT INTO 원자재 VALUES (?, ?, ?, ?, ?, ?)`;
      const id = Math.random().toString(32).slice(2);
      const name = req.body.name;
      const size = req.body.size;
      const unit = req.body.unit;
      const price = req.body.price;
      const brand = req.body.brand;
      const params = [id, name, size, unit, price, brand];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
      });
    }
    conn.release();
  });
});

app.get("/api/material", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query("SELECT * FROM 원자재", (err, rows, fields) => {
        res.send(rows)
      })
    }
    conn.release();
  })
})
app.get("/api/production", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query("SELECT * FROM 제품", (err, rows, fields) => {
        res.send(rows)
      })
    }
    conn.release();
  })
})

/* 파라미터 받기, req.params 형태로 확인할 수 있다. */
app.get("/api/currentstock/:id", (req, res)=>{
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = `SELECT * FROM 원자재재고 WHERE 원자재ID=?`;
      /* 파라미터 넘기기 */
      const id = req.params.id;
      const params = [id]
      console.log(params)
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows)
      });
    }
    conn.release();
  })
})
app.get("/api/production/:id", (req, res)=>{
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = `SELECT * FROM 제품재고 WHERE 제품ID=?`;
      /* 파라미터 넘기기 */
      const id = req.params.id;
      const params = [id]
      console.log(params)
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows)
      });
    }
    conn.release();
  })
})