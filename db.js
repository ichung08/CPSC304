const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'smash'
});

module.exports = pool;
