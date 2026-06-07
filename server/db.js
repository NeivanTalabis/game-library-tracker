// server/db.js
// Works for both local development and Railway production.
// Railway injects MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT
// automatically when you link a MySQL service to your project.
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host:     process.env.MYSQLHOST     || process.env.DB_HOST     || 'localhost',
  user:     process.env.MYSQLUSER     || process.env.DB_USER     || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME     || 'game_library',
  port:     process.env.MYSQLPORT     || process.env.DB_PORT     || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: process.env.MYSQLHOST ? { rejectUnauthorized: false } : undefined,
});

module.exports = pool.promise();
