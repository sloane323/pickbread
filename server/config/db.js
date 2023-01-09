const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'breadpick.cw5zfuggmrw5.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '4jAJUqLc4Vdr',
    database: 'breadpick'
});


module.exports = pool;