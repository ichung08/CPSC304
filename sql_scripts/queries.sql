/* RUBRIC */

/* 1) Query: INSERT
The user should be able to specify what values to insert. 
The insert operation should affect more than one table 
(i.e., an insert should occur on a table with a foreign key). 
The chosen query and table(s) should make sense given the context of the application.*/

/* 2) Query: DELETE - DONE
Implement a cascade-on-delete situation (or an alternative that was agreed to by the TA if the DB system doesn’t provide this). 
The user should be able to choose what values to delete. The tables that the delete operation will run on can be chosen by the group. 
The chosen query and table(s) should make sense given the context of the application. */

DELETE FROM Tournament WHERE tournament_id = 900;

/* 3) Query: UPDATE - DONE
The user should be able to specify whichever value(s) to update (i.e., any number of values in one or more columns). 
The group can choose which table to run this query on. The chosen query and table(s) should make sense given the context of the application. */

/* Increments wins of all players who have won more than 500 matches by 1. */
UPDATE Player
SET wins = wins + 1
WHERE wins > 500;

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

/* Returns all results containing only the username and country attributes for all players in the Player table.*/
SELECT username, country
FROM Player;

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
2) Number of games they played.*/
SELECT Player.username, COUNT(Game_Player.game_id) AS num_games_played
FROM Player
JOIN Game_Player ON Player.username = Game_Player.username
WHERE Player.username = ?
GROUP BY Player.username


/* 7) Query: Aggregation with GROUP BY
Create one query that requires the use of aggregation 
(min, max, average, or count are all fine), 
and provide an interface (e.g., HTML button/dropdown, etc.) for the user to execute this query. 
The group can choose which table to run this query on. 
The query and chosen table(s) should make sense given the context of the application.*/

/* Find total number of wins for each country*/
SELECT country, SUM(wins) as total_wins
FROM Player
GROUP BY country;

/* 8) Query: Aggregation with HAVING
Create one meaningful query that requires the use of a HAVING clause, 
and provide an interface (e.g., HTML button/dropdown, etc.) for the user to execute this query.
The query and chosen table(s) should make sense given the context of the application. */



/* 9) Query: Nested Aggregation with GROUP BY
Create one query that finds some aggregated value for each group 
(e.g., use a nested subquery, such as finding the average number of items purchased per customer, subject to some constraint). 
Some examples for the Sailors table are given in the project specs. 
Note the difference between this query and the above Aggregation Query. 
You must use separate distinct queries for this criterion and the Aggregation Query (i.e., do not double dip).
It is fine to use a view to get the desired behaviour.
The query and chosen table(s) should make sense given the context of the application.*/


/* 10) Query: Division
Create one query of this category and provide an interface 
(i.e., HTML button, etc.) for the user to execute this query 
(e.g., find all the customers who bought all the items).
The query and chosen table(s) should make sense given the context of the application. */
