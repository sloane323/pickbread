/* server/server.js */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
const pool = require("./config/db");
const { getVendors, postVendor, putVendor, deleteVendor } = require("./api/vendor");
const { getCustomers, postCustomer, putCustomer, deleteCustomer } = require("./api/customer");
const { getMaterials, postMaterial, searchMaterial } = require("./api/material");
const { postNewPoint, adjustPoint } = require("./api/point");
const { getMStock, getSingleMStock, postMStock, putMStockByManufacture, disposeMStock } = require("./api/mStock");
const { getPurchasing, searchPurchasing, postPurchasing } = require("./api/purchasing");
const { getManufacture, postManufacture } = require("./api/manufacture");
const { getProduct, searchProduct, postProduct, deleteProduct, getProduction } = require("./api/product");
const { postRecipe, getRecipe, deleteRecipe } = require("./api/recipe");
const { postMUsage } = require("./api/mUsage");
const { getSinglePStock, putPStockBySales, getPStock, searchPStock, postPStock, disposePStock } = require("./api/pStock");
const { postSales } = require("./api/sales");
const { getSalesLog } = require("./api/salesLog");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`Response Complete`);
});

// 거래처(/api/vendor)
/* 거래처 조회 및 검색*/
app.get("/api/vendor", getVendors);
/* 거래처 추가 */
app.post("/api/vendor", postVendor);
/* 거래처 수정 */
app.put("/api/vendor/:id", putVendor);
/* 거래처 삭제 */
app.delete("/api/vendor", deleteVendor);

// 고객(/api/customer)
/* 고객 조회 및 검색 */
app.get("/api/customer", getCustomers);
/* 고객 등록 */
app.post("/api/customer", postCustomer);
/* 고객 수정  */
app.put("/api/customer/:id", putCustomer);
/* 고객 삭제 */
app.delete("/api/customer", deleteCustomer);

// 포인트
/* 신규 회원 포인트 자동 등록*/
app.post("/api/point/", postNewPoint);
/* 포인트 수동 등록 */
app.post("/api/point/:id", adjustPoint);

// 원자재(/api/material)
/* 원자재 추가 */
app.post("/api/material", postMaterial);
/* 원자재 조회 */
app.get("/api/material", getMaterials);
/* 원자재 검색 */
app.get("/api/material/:searchQuery", searchMaterial);

// 원자재재고(/api/m_stock)
/* 원자재재고 조회 */
app.get("/api/m_stock", getMStock);
app.get("/api/currentstock/:id", getSingleMStock);
/* 원자재재고 등록 */
app.post("/api/m_stock", postMStock);
/* 제품 제작에 따른 원자재 재고 수정 */
app.put("/api/m_stock", putMStockByManufacture);
/* 원자재재고 수동 폐기 및 폐기 취소 */
app.put("/api/m_stock/dispose/:id", disposeMStock);

// 원자재구매(/api/purchasing)
/* 원자재구매 조회 */
app.get("/api/purchasing", getPurchasing);
/* 원자재구매 검색 */
app.get("/api/purchasing/:searchQuery", searchPurchasing);
/* 원자재구매 등록 */
app.post("/api/purchasing", postPurchasing);

// 제품(/api/product)
/* 제품 조회 */
app.get("/api/product", getProduct);
/* 제품 검색 */
app.get("/api/product/:searchQuery", searchProduct);
/* 제품 등록(product 경로) */
app.post("/api/product", postProduct);
//제품 삭제
app.delete("/api/product", deleteProduct);
/* 제품 조회(production 경로, ORDER BY 이름) */
app.get("/api/production", getProduction);

// 레시피(/api/recipe)
/* 레시피 조회 */
app.get("/api/recipe", getRecipe);
/* 레시피 등록 */
app.post("/api/recipe", postRecipe);
/* 레시피 삭제 */
app.delete("/api/recipe", deleteRecipe);

// 제품 생산(/api/manufacture)
/* 제품 생산 조회 */
app.get("/api/manufacture", getManufacture);
/* 제품생산 등록 */
app.post("/api/manufacture", postManufacture);

// 원자재사용량(/api/m_usage)
/* 원자재 사용량 등록 */
app.post("/api/m_usage", postMUsage);

// 제품재고(/api/p_stock)
/* 제품재고 조회 */
app.get("/api/p_stock", getPStock);
/* 각 제품재고 조회 */
app.get("/api/p_stock/:id", getSinglePStock);
/* 결제시 재고 수정 */
app.put("/api/p_stock", putPStockBySales);
/* 제품재고 등록 */
app.post("/api/p_stock", postPStock);
/* 검색 시 각 제품 재고 조회 */
app.get("/api/p_stock/search/:searchQuery", searchPStock);
/* 제품재고 폐기 */
app.put("/api/p_stock/dispose/:id", disposePStock);

// 판매(/api/sales)
/* 판매 등록 */
app.post("/api/sales", postSales);

// 판매내역(/api/saleslog)
/* 판매 내역 조회 */
app.get("/api/saleslog", getSalesLog);

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
