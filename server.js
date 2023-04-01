const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '304',
  database: 'smash'
});

connection.connect();

app.get('/api/message', (req, res) => {
  connection.query('SELECT message FROM messages', (err, results) => {
    if (err) throw err;
    res.json({ message: results[0].message });
  });
});
