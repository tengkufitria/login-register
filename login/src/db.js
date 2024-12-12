require('dotenv').config();
const mysql = require('mysql2');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_DATABASE,
  MYSQL_PASSWORD
} = process.env;

const createPool = mysql.createPool({
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT, 10),
  user: MYSQL_USER,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD
});

createPool.getConnection(err => {
  if (err) {
    console.log(err);
  }
});

const pool = createPool.promise();

module.exports = pool;
