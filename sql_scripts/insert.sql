/* 1) username, ranking, wins, losses */
INSERT INTO Player
VALUES ("Overtaker", 1, 509, 5),
("Anywehe", 2, 634, 12),
("Sally", 234, 23, 6),
("Adam", 6, 498, 6),
("Zahgrd", 3266, 5, 86),
("Victory", 10, 345, 9),
("Christian", 8, 236, 5),
("Hauntzer", 88, 145, 46);

/* 2) character_name, costume*/
INSERT INTO Smash_Character
VALUES ("Bowser", "orange"),
("Mario", "red"),
("Peach", "pink"),
("Yoshi", "green"),
("Wario", "purple"),
("Daisy", "yellow"),
("Pikachu", "green"),
("Kirby", "pink");

/* 3) spirits_name CHAR(20), spirits_ability CHAR(20), spirits_type CHAR(20) */
INSERT INTO Spirits
VALUES ("Mario", "Fight", "Fighter"),
("Mini Mario & Hammers", "Longer Hammer Duration", "Primary"),
("Huey", "Higher Water/Freezing Resist", "Support"),
("Vivian", "Lower Weight", "Primary"),
("Rock Mario", "Higher Physical Attack", "Support"),
("Cat Princess Peach", "Lower Weight", "Primary"),
("Captain Toad", "Item Gravitation", "Primary");

/* 4) game_id, game_mode, stage_name, ruleset_type, spirits_name, */
INSERT INTO Game
VALUES (40, "Classic", "Battlefield", "Time limit", "Mario"),
(5, "Adventure", "Mario Galaxy", "Stamina", "Vivian"),
(263, "All-Star", "Supper Happy Tree", "Stock", "Captain Toad"),
(2634, "Event", "Windy Hill Zone", "Stock", "Cat Princess Peach"),
(234, "Stadium", "Spring Stadium", "Stamina", "Huey"),
(2345, "Training", "Battlefield", "Time limit", "Captain Toad"),
(12873, "Classic", "Big Blue", "Stock", "Mini Mario & Hammers");


/* 5) game_id INTEGER, username CHAR(20), character_name */
INSERT INTO Game_Player
VALUES (40, "Anywehe", "Mario"),
(5, "Overtaker", "Princess Peach"),
(263, "Christian", "Toad"),
(2634, "Sally", "Daisy"),
(234, "Adam", "Wario"),
(2345, "Victory", "Luigi"),
(12873, "Zahgrd", "Yoshi");


/* 6) tournament_id, tournament_name, organizer, start_date, end_date, prize_pool */
INSERT INTO Tournament
VALUES (1, "THE SMASHERS", "Taryn Wou", "2021-01-04", "2021-01-05", "2000"),
(15, "MEOWZERS", "Vanessa Lee", "2022-08-09", "2022-08-11", "30000"),
(17, "Ultra Tournament", "Isaac Chung", "2022-08-09", "2022-08-11", "30000"),
(5, "Sentinals", "Kitty Liu","“2022-08-09", "2022-08-11", "30000"),
(200, "100 Thieves", "Angelina Hsu","2022-08-09", "2022-08-11", "30000"),
(8, "Vancouver Smash Tournament", "Ellen Yang", "2022-08-09", "2022-08-11", "30000"),
(99, "Canadian Nationals", "Andrea Yeo", "2022-08-09", "2022-8-11", "30000"),
(21, "BC Provincials", "Annie Wang", "2022-06-16", "2022-06-18", "30000");


/* 7) game_id, tournament_id */
INSERT INTO Game_Tournament
VALUES (1, 17),
(15, 200),
(17, 99),
(5, 21),
(263, 200),
(2345, 99),
(99, 17),
(6, 15);
        
/* 8) character_name CHAR(20), ultimate_attack CHAR(20), cup_attack CHAR(20), neutral_attack CHAR(20), down_attack CHAR(20) */
INSERT INTO Ability
VALUES ("Mario", "Super Jump Punch", "F.L.U.D.D", "Fireball", "Hero"),
("Princess Peach", "Peach Parasol", "Vegetable", "Toad", "Spin"),
("Yoshi", "EggThrow", "Yoshi Bomb", "Egg Lay", "Crouch"),
("Wario", "Corkscrew", "Wario Waft", "Chomp", "Spin"),
("Daisy", "Daisy Parasol", "Vegetable", "Toad", "Slash"),
("Luigi", "Quick Attack", "Thunder", "Thunder Jolt", "Jump"),
("Bowser", "Final Cutter", "Stone", "Inhale", "Flame");


/* 9) stage_name, form*/
INSERT INTO Stage
VALUES ("Battlefield", "Battlefield"),
("Super Happy Tree", "Omega"),
("Spring Stadium", "Omega"),
("Windy Hill Zone", "Battlefield"),
("Mario Galaxy", "Normal"),
("Mushroom Kingdom I", "Normal"),
("Big Blue", "Battlefield");


/* 10) ruleset_type, win_criteria*/
INSERT INTO Ruleset 
VALUES ("Stock", "aaa"),
("Time limit", "bbb"),
("Stamina", "ccc"),
("Stock", "ddd"),
("Stock", "eee"),
("Stamina", "fff"),
("Time limit", "ggg");

/* 11) game_id, competitor_type, game_mode, stage_name, ruleset_type, spirits_name*/

INSERT INTO Single_Player_Game
VALUES (23, "CPU",  "Classic", "Battlefield", "Time limit", "Mario"),
(5, "CPU", "Adventure", "Mario Galaxy", "Stamina", "Vivian"),
(23, "Player", "All-Star", "Supper Happy Tree", "Stock", "Captain Toad"),
(96, "Player", "Event", "Windy Hill Zone", "Stock", "Cat Princess Peach"),
(903, "CPU", "Stadium", "Spring Stadium", "Stamina", "Huey"),
(2345, "Player", "Training", "Battlefield", "Time limit", "Captain Toad"),
(12873, "CPU", "Classic", "Big Blue", "Stock", "Mini Mario & Hammers");


/* 12) game_id, number_of_players, game_mode, stage_name, ruleset_type, spirits_name*/
INSERT INTO Multi_Player_Game
VALUES (2, 3,  "Classic", "Battlefield", "Time limit", "Mario"),
(90, 5, "Adventure", "Mario Galaxy", "Stamina", "Vivian"),
(24, 6, "All-Star", "Supper Happy Tree", "Stock", "Captain Toad"),
(99, 2, "Event", "Windy Hill Zone", "Stock", "Cat Princess Peach"),
(13, 7, "Stadium", "Spring Stadium", "Stamina", "Huey"),
(123, 8, "Training", "Battlefield", "Time limit", "Captain Toad"),
(17, 4, "Classic", "Big Blue", "Stock", "Mini Mario & Hammers");










