/* server/server.js */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const pool = require("./config/db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Response Complete`);
});

app.get("/api/vendor", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 벤더";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
});
app.get("/api/material", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 원자재";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
});
app.post("/api/purchasing", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 원자재구매 VALUES (?, ?, ?, ?, null)";
      const purchasingID = req.body.purchasingID;
      const vendorID = req.body.vendorID;
      const purchaseDate = req.body.purchaseDate;
      const totalCost = req.body.totalCost;
      const params = [purchasingID, vendorID, purchaseDate, totalCost];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});
app.post("/api/m_stock", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 원자재재고 VALUES (?, ?, ?, ?, ?, ?)";
      const stockID = req.body.stockID;
      const purchasingID = req.body.purchasingID;
      const materialID = req.body.materialID;
      const name = req.body.name;
      const amount = req.body.amount;
      const expDate = req.body.expDate;
      const params = [stockID, purchasingID, materialID, name, amount, expDate];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});