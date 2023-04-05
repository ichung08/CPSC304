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
    if (ranking_level) {
        conditions.push(`ranking_level = ${ranking_level}`);
    }
    if (age) {
        conditions.push(`age = ${age}`);
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

    const validAttributes = ['username', 'country', 'ranking_level', 'age', 'wins', 'losses'];
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

/* Get all abilities */
router.get('/ability', async function(req, res, next) {
    sql.query(`SELECT * FROM Ability`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        } 

        res.json(results)
    })
})

/* 1) Query: INSERT
The user should be able to specify what values to insert. 
The insert operation should affect more than one table 
(i.e., an insert should occur on a table with a foreign key). 
The chosen query and table(s) should make sense given the context of the application.*/

router.post('/ability', async function(req, res, next) {
    const body = req.body
    sql.query(`INSERT INTO ABILITY VALUES 
        ("${body.character_name}", "${body.ultimate_attack}", "${body.up_attack}", "${body.neutral_attack}", "${body.down_attack}")`, (error, results) => {
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

/* 7) Query: Aggregation with GROUP BY
Create one query that requires the use of aggregation 
(min, max, average, or count are all fine), 
and provide an interface (e.g., HTML button/dropdown, etc.) for the user to execute this query. 
The group can choose which table to run this query on. 
The query and chosen table(s) should make sense given the context of the application.*/

/* Find total number of wins for each country
Use Case: Find the statistics for country wins */
router.get('/country-wins', async function(req, res, next) {
    sql.query(`SELECT country, SUM(wins) as total_wins
        FROM Player
        GROUP BY country`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        }

        res.json(results)
      });
});

/* 8) Query: Aggregation with HAVING
Create one meaningful query that requires the use of a HAVING clause, 
and provide an interface (e.g., HTML button/dropdown, etc.) for the user to execute this query.
The query and chosen table(s) should make sense given the context of the application. */

/* This query calculates the number of players in each country that has more than 2 players and orders the results by the number of players in descending order. 
The HAVING clause filters the groups with less than 3 players.
Use case: We want to see which countries can create teams to send to tournaments (teams = countries with more than 1 player) */
router.get('/country-teams', async function(req, res, next) {
    sql.query(`SELECT country, COUNT(username) AS num_players
        FROM Player
        GROUP BY country
        HAVING num_players > 3
        ORDER BY num_players DESC`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        }

        res.json(results)
      });
});

/* 9) Query: Nested Aggregation with GROUP BY
Create one query that finds some aggregated value for each group 
(e.g., use a nested subquery, such as finding the average number of items purchased per customer, subject to some constraint). 
Some examples for the Sailors table are given in the project specs. 
Note the difference between this query and the above Aggregation Query. 
You must use separate distinct queries for this criterion and the Aggregation Query (i.e., do not double dip).
It is fine to use a view to get the desired behaviour.
The query and chosen table(s) should make sense given the context of the application.*/

/* Retrieves the average age of players for each ranking level, 
but only for ranking levels that have more than one player.
The results are sorted in ascending order of ranking levels, from beginner to diamond.

Use Case: Collect data on age averages of ranking levels,
but only for ranking levels that have more than one player. This will prevent bias:
(ie, if a ranking level only has one player, the average age may not useful for data collection) */

router.get('/avg-age-per-rank', async function(req, res, next) {
    sql.query(`SELECT p1.ranking_level, AVG(p1.age) as avg_age
        FROM Player p1
        GROUP BY p1.ranking_level
        HAVING 1 < (SELECT COUNT(*)
                    FROM Player p2
                    WHERE p1.ranking_level = p2.ranking_level)
        ORDER BY
        CASE ranking_level 
            WHEN 'beginner' THEN 1 
            WHEN 'bronze' THEN 2
            WHEN 'silver' THEN 3
            WHEN 'gold' THEN 4
            WHEN 'platinum' THEN 5
            WHEN 'diamond' THEN 6
        END ASC;`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        }

        res.json(results)
      });
});

/* 10) Query: Division
Create one query of this category and provide an interface 
(i.e., HTML button, etc.) for the user to execute this query 
(e.g., find all the customers who bought all the items).
The query and chosen table(s) should make sense given the context of the application. */


/* Selects the usernames of players that have played in every game of the specified X tournament.
1) the query uses a subquery that finds all the game IDs in the Game_Tournament table for tournament X
2) compares it with the game IDs in the Game_Player table for each individual player
3) If a player has played in all games for the tournament, their username will be returned by the outer SELECT statement. 
The EXCEPT keyword is used to find the game IDs in the first subquery that are not present in the second subquery, 
which helps determine if a player has played in all the games or not.

Use case: tournament organizers can give out the most participation award
*/

router.get('/player/participation', async function(req, res, next) {
    sql.query(`SELECT username
        FROM Player 
        WHERE NOT EXISTS (
            SELECT game_id
            FROM Game_Tournament 
            WHERE tournament_id = 800
            EXCEPT
            SELECT game_id
            FROM Game_Player 
            WHERE Game_Player.username = Player.username)`, (error, results) => {
        if (error) {
            console.error(`Error`, error.message)
            next(error)
        }

        res.json(results)
    });
});

module.exports = router;