const express = require('express');
const router = express.Router();
const sql = require('../db')

/* Select Player */
router.get('/', async function(req, res, next) {
    sql.query('SELECT * FROM Player', (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
      });
});

/* Filter Player */
router.get('/filter', async function(req, res, next) {
    const {username, country, wins, losses} = req.query;
    let query = "SELECT * FROM Player WHERE";
    let conditions = [];
    if (username) {
        conditions.push(`username = '${username}'`);
    }
    if (country) {
        conditions.push(`country = '${country}'`);
    }
    if (wins) {
        conditions.push(`wins = ${wins}`);
    }
    if (losses) {
        conditions.push(`losses = ${losses}`);
    }
    if (conditions.length > 0) {
        query += " " + conditions.join(" AND ");
    } else {
        query = "SELECT * FROM Player";
    }
    sql.query(query, (error, results) => {
        if (error) {
            console.error(`Error`, error.message);
            next(error);
        }

        res.json(results);
    });
});

/* Select Player by  */
router.get('/wins=:wins', async function(req, res, next) {
    sql.query(`SELECT * FROM Player WHERE wins=${req.params.wins}`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
      });
});

/* Insert Player */
router.post('/', async function(req, res, next) {
    const body = req.body
    sql.query(`INSERT INTO Player VALUES 
        ("${body.username}", "${body.country}", ${body.wins}, ${body.losses})`, (error, results) => {
            if (error) {
                console.error(`Error`, error.message)
                next(error)
            } 
    
            res.json(results)
    })
});

/* Update Player */
router.put('/:username', async function(req, res, next) {
    const body = req.body
    sql.query(`UPDATE Player SET 
        country="${body.country}", wins="${body.wins}", losses="${body.losses}"
        WHERE username="${req.params.username}"`, (error, results) => {
            if (error) {
                console.error(`Error`, error.message)
                next(error)
            } 
    
            res.json(results)
    })
});

/* Delete Player */
router.delete('/:username', async function(req, res, next) {
    sql.query(`DELETE FROM Player WHERE username="${req.params.username}"`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
    })
});



module.exports = router;