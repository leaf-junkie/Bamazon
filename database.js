const mysql = require('mysql');

// Connect to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'bamazon'
});

module.exports = connection;