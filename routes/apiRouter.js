const express = require('express');
const router = express.Router();
const sql = require('../db')

/* Get All Player */
router.get('/players', async function(req, res, next) {
    sql.query('SELECT * FROM Player', (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
      });
});

/* 4) Query: Selection 
The user is able to specify the filtering conditions for a given table. 
That is, the user is able to determine what shows up in the WHERE clause.
The group can choose which table to run this query on. 
The query and chosen table(s) should make sense given the context of the application.*/

router.get('/player-selection', async function(req, res, next) {
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

/* 5) Query: Projection 
The user is able to choose any number of attributes to view from any relation in the database. 
Non-selected attributes must not appear in the result. 
One or more tables in the relation must contain at least four attributes.*/

router.get('/player-projection', async function(req, res, next) {
    const attributes = req.query.attributes;

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
        return res.status(400).json({ error: 'At least one attribute must be requested' });
    }

    const validAttributes = ['username', 'country', 'wins', 'losses'];
    const invalidAttributes = attributes.filter(attr => !validAttributes.includes(attr));
    if (invalidAttributes.length > 0) {
        return res.status(400).json({ error: `Invalid attribute(s): ${invalidAttributes.join(', ')}` });
    }

    const selectClause = attributes.join(', ');

    sql.query(`SELECT ${selectClause} FROM Player`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
      });
});

/* Insert Player */
router.post('/player', async function(req, res, next) {
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

/* 3) Query: UPDATE 
The user should be able to specify whichever value(s) to update (i.e., any number of values in one or more columns). 
The group can choose which table to run this query on. The chosen query and table(s) should make sense given the context of the application. */

router.put('/player/:username', async function(req, res, next) {
    const body = req.body;
    const columnsToUpdate = Object.keys(body);
    const valuesToUpdate = Object.values(body);
    
    let sqlQuery = "UPDATE Player SET ";
    for (let i = 0; i < columnsToUpdate.length; i++) {
        sqlQuery += `${columnsToUpdate[i]}="${valuesToUpdate[i]}"`;
        if (i < columnsToUpdate.length - 1) {
            sqlQuery += ", ";
        }
    }
    sqlQuery += ` WHERE username="${req.params.username}"`;

    sql.query(sqlQuery, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 
        res.json(results)
    })
});

/* Get all tournaments */
router.get('/tournament', async function(req, res, next) {
    sql.query(`SELECT * FROM Tournament`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
    })
})

/* 2) Query: DELETE
Implement a cascade-on-delete situation (or an alternative that was agreed to by the TA if the DB system doesn’t provide this). 
The user should be able to choose what values to delete. The tables that the delete operation will run on can be chosen by the group. 
The chosen query and table(s) should make sense given the context of the application. */

router.delete('/tournament/:id', async function(req, res, next) {
    sql.query(`DELETE FROM Tournament WHERE tournament_id="${req.params.id}"`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
    })
});

/* 6) Query: Join
Create one query in this category, which joins at least 2 tables and performs a meaningful query, 
and provide an interface for the user to execute this query. 
The user must provide at least one value to qualify in the WHERE clause 

/*Return the number of games played by a player. 
The result will have two columns:
1) Player's username
2) Number of games they played.*/
router.get('/games-played/:username', async function(req, res, next) {
    const username = req.params.username;

    sql.query(`SELECT Player.username, COUNT(Game_Player.game_id) AS num_games_played
        FROM Player
        JOIN Game_Player ON Player.username = Game_Player.username
        WHERE Player.username = ?
        GROUP BY Player.username`, [username], (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
      });
});



module.exports = router;