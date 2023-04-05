const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'smash'
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  } else {
    throw err;
  }
});

module.exports = pool;
