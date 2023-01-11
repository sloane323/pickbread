/* server/server.js */

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
        })
    }
    conn.release();
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

app.post("/api/material", (req, res) => {
  console.log(req, res)
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      /* req.body */
      conn.query(`INSERT INTO 원자재 values ${(req.MaterialID, req.MaterialName, req.MaterialPrice, req.MaterialBrand)}`)
    }
    conn.release();
  })
})