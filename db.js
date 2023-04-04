const mysql = require('mysql2');

const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smash',
}};

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}