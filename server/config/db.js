const mysql = require('mysql');

const db = mysql.createPool({
    host: 'db-1.cfhnsxflezdq.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: '4jAJUqLc4VdrC2HY5vF',
    database: 'db-1'
});

module.exports = db;