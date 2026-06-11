const mysql = require("mysql2")
require("dotenv").config({})

const connectionConfig = process.env.MYSQL_URL 
    ? {
        uri: process.env.MYSQL_URL,
        ssl: {
            rejectUnauthorized: false
        }
      }
    : {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DB,
        port: process.env.MYSQL_PORT,
        ssl: process.env.MYSQL_HOST && process.env.MYSQL_HOST !== 'localhost' && process.env.MYSQL_HOST !== '127.0.0.1' 
            ? { rejectUnauthorized: false } 
            : undefined
      };

const connection = mysql.createPool(connectionConfig);

module.exports = connection