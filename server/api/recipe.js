const pool = require("../config/db");

/** 레시피 GET */
const getRecipe = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql =
      "select 레시피.레시피ID, 제품.*, 원자재.이름 from 레시피 left join 제품 on 제품.제품ID = 레시피.제품ID left join 원자재 on 레시피.원자재ID = 원자재.원자재ID";
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 레시피 POST */
const postRecipe = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = "INSERT INTO 레시피 VALUES (?, ?, ?)";
    const recipeId = Math.random().toString(32).slice(2);
    const { productId, materialId } = req.body;
    const params = [recipeId, productId, materialId];
    conn.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

/** 레시피 DELETE */
const deleteRecipe = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const sql = `DELETE FROM 레시피 WHERE 레시피ID = "${req.body.id}"`;
    conn.query(sql, (err, rows, fields) => {
      res.send(rows);
    });
    conn.release();
  });
};

module.exports = { getRecipe, postRecipe, deleteRecipe };
