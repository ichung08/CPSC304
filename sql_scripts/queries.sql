/* RUBRIC */

/* 1) Query: INSERT - DONE
The user should be able to specify what values to insert. 
The insert operation should affect more than one table 
(i.e., an insert should occur on a table with a foreign key). 
The chosen query and table(s) should make sense given the context of the application.*/

/* 1. Zelda already exists in the table */
INSERT INTO Ability
VALUES ("Zelda", "Arrow", "Wind", "Transform", "Fire");

/* 2. Insert character first in Smash_Character, then insert their abilities in Ability */
INSERT INTO Smash_Character
VALUES ("Mii Fighters", "Yellow");

INSERT INTO Ability
VALUES ("Mii Fighters", "Yoga", "Breathe", "Stretch", "Kick"); 

/* 3. Error: Ability cannot be added, since this character does not exist in our Super Smash Bros records.*/
INSERT INTO Ability
VALUES ("Mickey Mouse", "Wave", "Hug", "Hello", "Sing");

/* Jessica on Piazza for 1) INSERT
Depending on the context of the situation for insert, you may end up in one of three situations:

1. Foreign key value already exists in the table so you can insert the tuple with no problems.
2. Foreign key value does not exist yet so you need to first run an insert into the table before inserting the value the user has chosen. This option may not make sense given the context you are using insert for.
3. Return an error to the user saying this insert cannot go through because <some reasonable and understandable-to-the-average-non-computer-scientist reason here>.
Scenarios 1 + 2 or 1 + 3 are reasonable combinations to have your application handle. */

----------------
/* 2) Query: DELETE - DONE
Implement a cascade-on-delete situation (or an alternative that was agreed to by the TA if the DB system doesn’t provide this). 
The user should be able to choose what values to delete. The tables that the delete operation will run on can be chosen by the group. 
The chosen query and table(s) should make sense given the context of the application. */

/* Deletes a tournament and all tables with that tournament
Use Case: A tournament later this year gets canceled, so we want to remove all traces of this tournament:
- the tournament itself (Tournament) 
- games scheduled that were supposed to be scheduled then (Game_Tournament) */

DELETE FROM Tournament WHERE tournament_id = 900;

/* 3) Query: UPDATE - DONE
The user should be able to specify whichever value(s) to update (i.e., any number of values in one or more columns). 
The group can choose which table to run this query on. The chosen query and table(s) should make sense given the context of the application. */

/* Increments wins by 1 of all players from Canada 
Use case: Team Canada wins a game at a Smash World Championships */
UPDATE Player
SET wins = wins + 1
WHERE country = "Canada";

/* 4) Query: Selection - DONE
The user is able to specify the filtering conditions for a given table. 
That is, the user is able to determine what shows up in the WHERE clause.
The group can choose which table to run this query on. 
The query and chosen table(s) should make sense given the context of the application.*/

/* Find all players with 1 win */
SELECT *
FROM Player
WHERE wins = 1;

/* 5) Query: Projection - DONE
The user is able to choose any number of attributes to view from any relation in the database. 
Non-selected attributes must not appear in the result. 
One or more tables in the relation must contain at least four attributes.*/

/* Returns all usernames of players and the countries they are from
Use case: Collecting data to see the number of competitive players in certain countries for marketing promotions*/
SELECT username, country
FROM Player


/* 6) Query: Join - DONE
Create one query in this category, which joins at least 2 tables and performs a meaningful query, 
and provide an interface for the user to execute this query. 
The user must provide at least one value to qualify in the WHERE clause 
(e.g. join the Customer and the Transaction table to find the names and phone numbers of all customers who have purchased a specific item). 
The group can choose which tables will be affected by the query. 
The query and chosen table(s) should make sense given the context of the application.*/

/*Return the number of games played by a Player. 
The result will have two columns:
1) Player's username
2) Number of games they played.
Use Case: A glimpse of a player's playing experience/history */
SELECT Player.username, COUNT(Game_Player.game_id) AS num_games_played
FROM Player
JOIN Game_Player ON Player.username = Game_Player.username
WHERE Player.username = ?
GROUP BY Player.username

/* 7) Query: Aggregation with GROUP BY - DONE
Create one query that requires the use of aggregation 
(min, max, average, or count are all fine), 
and provide an interface (e.g., HTML button/dropdown, etc.) for the user to execute this query. 
The group can choose which table to run this query on. 
The query and chosen table(s) should make sense given the context of the application.*/

/* Find total number of wins for each country
Use Case: Find the statistics for country wins */
SELECT country, SUM(wins) as total_wins
FROM Player
GROUP BY country;

/* 8) Query: Aggregation with HAVING - DONE
Create one meaningful query that requires the use of a HAVING clause, 
and provide an interface (e.g., HTML button/dropdown, etc.) for the user to execute this query.
The query and chosen table(s) should make sense given the context of the application. */

/* This query calculates the number of players in each country that has more than 2 players and orders the results by the number of players in descending order. 
The HAVING clause filters the groups with less than 3 players.
Use case: We want to see which countries can create teams to send to tournaments (teams = countries with more than 1 player) */
SELECT country, COUNT(username) AS num_players
FROM Player
GROUP BY country
HAVING num_players > 3
ORDER BY num_players DESC;


/* 9) Query: Nested Aggregation with GROUP BY - DONE
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

SELECT p1.ranking_level, AVG(p1.age) as avg_age
FROM Player p1
GROUP BY p1.ranking_level
HAVING 1 < ( SELECT COUNT(*)
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
END ASC;

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

SELECT username
FROM Player 
WHERE NOT EXISTS (
    SELECT game_id
    FROM Game_Tournament 
    WHERE tournament_id = 800
    EXCEPT
    SELECT game_id
    FROM Game_Player 
    WHERE Game_Player.username = Player.username
);