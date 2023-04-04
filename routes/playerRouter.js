const express = require('express');
const router = express.Router();
const sql = require('../db')

/* GET Player */
router.get('/', async function(req, res, next) {
    sql.query('SELECT * FROM Player', (error, results) => {
        if (error) {
            next(error)
        } 

        res.json(results)
      });
});

module.exports = router;