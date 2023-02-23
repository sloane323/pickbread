/* server/server.js */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const pool = require("./config/db");
const bodyParser = require("body-parser");
const getVendors = require("./api/vendor");

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
app.post("/api/material", (req, res) => {
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
        console.log(err);
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
/* 각 원자재 조회 */
app.get("/api/currentstock/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = `SELECT * FROM 원자재재고 WHERE 원자재ID=?`;
      /* 파라미터 넘기기 */
      const id = req.params.id;
      const params = [id];
      console.log(params);
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
      });
    }
    conn.release();
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
/* 제품 제작에 따른 원자재 재고 수정 */
app.put("/api/m_stock", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "UPDATE 원자재재고 SET 잔량 = 잔량 - ?, 폐기여부 = 폐기여부 + ? WHERE 재고ID = ?"
      const materialUsage = req.body.materialUsage;
      const materialDispose = req.body.materialDispose;
      const selectedMaterialStockId = req.body.selectedMaterialStockId;
      const params = [materialUsage, materialDispose, selectedMaterialStockId]
      console.log(params);
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  })
})
/* 원자재 폐기 */
app.put("/api/m_stock/dispose/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { id } = req.params;
    const dispose = req.body.dispose;
    const sql = `UPDATE 원자재재고 SET 폐기여부=${!dispose} WHERE 재고ID = "${id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
});
/* 원자재재고 조회 */
app.get("/api/m_stock", (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      throw err;
    } else {
      const sql = "SELECT * FROM 원자재재고";
      conn.query(sql, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});
// 원자재 구매 조회
app.get("/api/purchasing", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "SELECT * FROM 원자재구매 LEFT JOIN 벤더 ON 원자재구매.벤더ID = 벤더.벤더ID ORDER BY 구매일 DESC";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
});
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
/* 원자재 사용량 등록 */
app.post("/api/m_usage", (req, res) => {
  pool.getConnection((err, conn) => {
    if(err) {
      throw err;
    } else {
      const sql = "INSERT INTO 원자재사용량 VALUES (?, ?, ?, ?)"
      const usageId = Math.random().toString(32).slice(2);
      const manufactureId = req.body.manufactureId;
      const selectedMaterialStockId = req.body.selectedMaterialStockId;
      const materialUsage = req.body.materialUsage;
      const params = [usageId, manufactureId, selectedMaterialStockId, materialUsage];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      })
      conn.release();
    }
  })
})
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
      const params = [productId, name, size, unit, price];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
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
//제품 삭제
app.delete("/api/product", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `DELETE FROM 제품 WHERE 제품ID = "${req.body.id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
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
app.get("/api/p_stock/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql =
        "SELECT 제품.*, 제품재고.재고ID, 제품재고.잔량, 제품재고.유통기한, 제품재고.폐기여부 FROM 제품 LEFT JOIN 제품재고 ON 제품.제품ID = 제품재고.제품ID WHERE 제품.제품ID = ? ORDER BY 유통기한";
      /* 파라미터 넘기기 */
      const id = req.params.id;
      const params = [id];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
      });
    }
    conn.release();
  });
});
/* 재고수정 */
app.put("/api/p_stock/dispose/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const { id } = req.params;
    const { dispose } = req.body;
    const sql = `UPDATE 제품재고 SET 폐기여부=${!dispose} WHERE 재고ID = "${id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
});
// 레시피 조회
app.get("/api/recipe", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql =
      "select 레시피.레시피ID, 제품.*, 원자재.이름 from 레시피 left join 제품 on 제품.제품ID = 레시피.제품ID left join 원자재 on 레시피.원자재ID = 원자재.원자재ID";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
});
/* 레시피 등록 */
app.post("/api/recipe", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 레시피 VALUES (?, ?, ?)";
      const recipeId = Math.random().toString(32).slice(2);
      const productId = req.body.productId;
      const materialId = req.body.materialId;
      const params = [recipeId, productId, materialId];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
    }
    conn.release();
  });
});
/* 레시피 삭제 */
app.delete("/api/recipe", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `DELETE FROM 레시피 WHERE 레시피ID = "${req.body.id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
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
      });
    }
    conn.release();
  });
});
/* 제품재고 등록 */
app.post("/api/p_stock", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 제품재고 VALUES (?, ?, ?, ?, ?, ?)";
      const productStockId = req.body.productStockId;
      const manufactureId = req.body.manufactureId;
      const selectedProductionId = req.body.selectedProductionId;
      const presentAmount = req.body.presentAmount;
      const expiryDate = req.body.expiryDate;
      const productDispose = req.body.productDispose;
      const params = [productStockId, manufactureId, selectedProductionId, presentAmount, expiryDate, productDispose];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
    }
    conn.release();
  });
});
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
app.delete("/api/vendor", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "DELETE FROM 벤더 WHERE 벤더ID = ?";
      const id = req.body.id;
      conn.query(sql, [id], (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
      conn.release();
    }
  });
});
/* 고객 등록 */
app.post("/api/customer", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 고객 VALUES(?, ?, ?, ?,?)";
      const customerId = req.body.customerId;
      const name = req.body.name;
      const phone = req.body.phone;
      const comment = req.body.comment;
      const time = req.body.time;
      const params = [customerId, name, phone, comment,time];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log("등록성공");
        console.log(err);
      });
      conn.release();
    }
  });
});

/** 고객삭제 */
app.delete("/api/customer", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `DELETE FROM 고객 WHERE 고객ID = "${req.body.id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
});

/* 포인트 */
app.post("/api/point", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "INSERT INTO 포인트 VALUES(?, ?, ?, ?)";
      const point = 1000;
      const id = Math.random().toString(32).slice(2);
      const customerId = req.body.customerId;
      const content = "신규 등록";
      const params = [id, customerId, null, content, point];
      conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log("등록성공");
        console.log(err);
      });
      conn.release();
    }
  });
});

// 고객 검색 & 검색
app.get("/api/customer", (req, res) => {
  const resultsPerPage = 7;
  const currentPage = req.query.page || 1;
  const offset = (currentPage - 1) * resultsPerPage;

  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      let sqlCount = `SELECT COUNT(*) as total FROM 고객`;
      let sql = `SELECT * FROM 고객 ORDER BY 이름 LIMIT ${resultsPerPage} OFFSET ${offset}`;
      if (req.query.search) {
        sqlCount = `SELECT COUNT(*) as total FROM 고객 WHERE 이름 = '${req.query.search}'`;
        sql = `SELECT * FROM 고객 WHERE 이름 = '${req.query.search}' ORDER BY 이름 LIMIT ${resultsPerPage} OFFSET ${offset}`;
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

/** 고객 수정  */
app.put("/api/customer/:id", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const sql = "UPDATE 고객 SET 이름 = ?, 전화번호 = ?, 코멘트 = ? WHERE 고객ID = ?";
      const name = req.body.name;
      const phone = req.body.phone;
      const comment = req.body.comment;
      const id = req.params.id;
      const createtime = req.params.createtime;
      const params = [name, phone, comment, id, createtime];
      console.log(params);
      conn.query(sql, params, (err, rows, fields) => {
        if (err) {
          throw err;
        } else {
          res.send(rows);
          console.log(err);
        }
      });
    }
    conn.release();
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
  pool.getConnection((err, conn) => {
    if (err) {
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
