/* server/server.js */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const pool = require("./config/db");

app.get("/", (req, res) => {
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
