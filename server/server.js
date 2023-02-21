/* server/server.js */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const pool = require("./config/db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.send(`Response Complete`);
});

/* 안 쓰는 쿼리문이라 간주, user 테이블 없음

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
}); */

/* 원자재 추가 */
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
      const defaultPrice = req.body.defaultPrice;
      const category = req.body.category;
      const expiryDate = req.body.expiryDate;
      const brand = req.body.brand;
      const pcsBarcode = req.body.pcsBarcode;
      const boxBarcode = req.body.boxBarcode;
      const origin = req.body.origin;
      const params = [id, name, size, unit, price, defaultPrice, category, expiryDate, brand, pcsBarcode, boxBarcode, origin];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err)
      });
    }
    conn.release();
  });
});
/* 원자재 조회 */
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
/* 원자재재고 등록 */
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
/* 각 원자재 조회 */
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
/* 원자재구매 등록 */
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
/* 제품 등록(product 경로) */
app.post("/api/product", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 제품 VALUES(?, ?, ?, ?, ?)";
      const productId = req.body.productId;
      const name = req.body.name;
      const size = req.body.size;
      const unit = req.body.unit;
      const price = req.body.price;
      console.log(req.body)
      const params = [productId, name, size, unit, price]
      conn.query(sql, params, (err, rows, fields)=>{
        res.send(rows)
        console.log(err);
      });
    }
    conn.release();
  });
});
/* 제품 조회 */
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
/* 제품 조회(production 경로, ORDER BY 이름) */
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
/* 각 제품재고 조회 */
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
/* 레시피 등록 */
app.post("/api/recipe", (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      throw err;
    } else {
      const sql = "INSERT INTO 레시피 VALUES (?, ?, ?)"
      const recipeId = Math.random().toString(32).slice(2);
      const productId = req.body.productId;
      const materialId = req.body.materialId;
      const params = [recipeId, productId, materialId]
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows)
        console.log(err);
      })
    }
    conn.release();
  });
});
/* 제품생산 등록 */
app.post("/api/manufacture", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 제품생산 VALUES (?, ?, ?, ?)";
      const manufactureId = req.body.manufactureId;
      const selectedProductionId = req.body.selectedProductionId;
      const enteredAmount = req.body.enteredAmount;
      const manufactureDate = req.body.manufactureDate;
      const params = [manufactureId, selectedProductionId, enteredAmount, manufactureDate];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
      })
    }
    conn.release();
  });
});
/* 제품재고 등록 */
app.post("/api/inventory", (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      throw err;
    } else {
      const sql = "INSERT INTO 제품재고 VALUES (?, ?, ?, ?, ?)";
      const inventoryId = Math.random().toString(32).slice(2);
      const manufactureId = req.body.manufactureId;
      const selectedProductionId = req.body.selectedProductionId;
      const presentAmount = req.body.presentAmount;
      const expiryDate = req.body.expiryDate;
      const params = [inventoryId, manufactureId, selectedProductionId, presentAmount, expiryDate];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
      })
    }
    conn.release();
  })
})
/* 제품재고 등록(p_stock 경로) */
/* app.post("/api/p_stock", (req, res) => {
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
}); */
/* 제품재고 조회 */
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
/* 거래처 추가 */
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
/* 거래처 조회 */
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
/* 거래처 삭제 */
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
/* 고객 등록 */
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


// 고객 검색
app.get("/api/customer", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      let sql = "SELECT * FROM 고객 order by 이름";
      if (req.query.search) {
        sql = `select * from 고객 where 이름 = '${req.query.search}'`;
      }
      conn.query(sql, (err, rows, fields) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
        }
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
/* 판매 내역 조회 */
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