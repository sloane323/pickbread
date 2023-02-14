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

app.get("/api/production", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 제품 ORDER BY 이름";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
});
app.get("/api/vendor", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 벤더 order by 이름";
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

// 
//거래처 등록(추가)
app.post("/api/vendor", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 벤더 VALUES(?, ?, ?, ?, ?)";
      const id = Math.random().toString(32).slice(2);
      const name = req.body.name;
      const phone = req.body.phone;
      const officer = req.body.officer;
      const comment = req.body.comment;
      const params = [id, name, phone, officer, comment];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});
//제품 제작 등록(AddProduct.jsx)
app.post("/api/product", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 제품 VALUES(?, ?, ?, ?, ?)";
      const id = req.body.id;
      const name = req.body.name;
      const size = req.body.size;
      const unit = req.body.unit;
      const price = req.body.price;
      console.log(req.body)
      const params = [id, name, size, unit, price]
      conn.query(sql, params, (err, rows, fields)=>{
        res.send(rows)
        console.log(err);
      });
    }
    conn.release();
  });
});

// 제품 조회
app.get("/api/product", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 제품";
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
      const sql = "INSERT INTO 원자재재고 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const stockID = req.body.stockID;
      const purchasingID = req.body.purchasingID;
      const materialID = req.body.materialID;
      const name = req.body.name;
      const size = req.body.size;
      const amount = req.body.amount;
      const balance = req.body.balance;
      const unit = req.body.unit;
      const expDate = req.body.expDate;
      const params = [stockID, purchasingID, materialID, name, size, amount, balance, unit, expDate];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});

// 제품재고 조회
app.get("/api/p_stock", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 제품재고";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
});

app.post("/api/p_stock", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 제품재고 VALUES (?, ?, ?, ?, )";
      const stockID = req.body.stockID;
      // 생산ID 임시
      const productionID = Math.random().toString(32).slice(2);
      const productID = req.body.productID;
      const amount = req.body.amount;
      const expDate = req.body.expDate;
      const params = [stockID, productID, amount, expDate];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});

// 거래처 삭제
app.delete('/api/vendor', (req,res)=>{
  pool.getConnection((err, conn)=>{
    if (err) {
      throw err;
    } else {
      const sql = "DELETE FROM 벤더 WHERE 벤더ID = ?";
      const id = req.body.id;
      conn.query(sql, [id], (err, rows, fields)=>{
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  })
})


// 고객 등록(추가)
app.post("/api/customer", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 고객 VALUES(?, ?, ?, ?)";
      const id = Math.random().toString(36).substring(2, 11);
      const name = req.body.name;
      const phone = req.body.phone;
      const comment = req.body.comment;
      const params = [id, name, phone, comment]
      conn.query(sql, params, (err, rows, fields)=>{
        res.send(rows)
        console.log("등록성공");
        console.log(err);
      });
    }
    conn.release();
  });
});

// 고객 조회
app.get("/api/customer", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 고객 order by 이름";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
});

// 판매 등록
// app.post("/api/sales", (req,res) => {
//   pool.getConnection((err, conn) => {
//     if(err) {
//       throw err;
//     } else {
//       const sql = "INSERT INTO 판매내용 VALUES(?,?,?,?,?,?,?)";
//       const productID = req.body.
//       const saleslogID= Math.random().toString(36).substring(2,11);
//       const 

//       const params = [id, amount]
//       conn.query(sql, params, (err, rows, fields) => {
//         res.send(rows)
//         console.log("등록성공");
//         console.log(err);
//       });
//     }
//     conn.release();
//   })
// });

// 판매 내역 받아오기 
app.get("/api/saleslog", (req, res) => {
  pool.getConnection((err,conn) => {
    if(err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 판매내역";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
      });
      conn.release();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});