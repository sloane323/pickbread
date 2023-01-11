/* server/server.js */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser")

const pool = require("./config/db");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`Response Complete`);
});


// vendor 등록
app.post("/api/vendor", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 벤더 VALUES(?, ?, ?, ?, ?)";
      
      const id = Math.random().toString(32).slice(2)
      const name = req.body.name;
      const phone = req.body.phone;
      const officer = req.body.officer;
      const comment = req.body.comment;
      const params = [id, name, phone, officer, comment]
      conn.query(sql, params, (err, rows, fields)=>{
        res.send(rows)
        console.log(err);
      });
    }
    conn.release();
  });
});


app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
