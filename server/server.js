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
        console.log(err)
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

app.get("/api/currentstock", (req, res) => {
  console.log(req.body)
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      console.log("currentstock accessed")
    }
    conn.release();
  })
})