INSERT INTO Player
VALUES ("Overtaker", 1, 509, 5),
("Anywehe", 2, 634, 12),
("Sally", 234, 23, 6),
("Adam", 6, 498, 6),
("Zahgrd", 3266, 5, 86),
("Victory", 10, 345, 9),
("Christian", 8, 236, 5),
("Hauntzer", 88, 145, 46);

INSERT INTO Plays_On_Console
VALUES ("Xbox","Microsoft Studios", 2010),
("Nintendo 3DS", "Nintendo", 2022),
("Nintendo Switch", "Nintendo", 2009),
("PS5", "Sony", 2011),
("PS4", "Sony", 2015),
("Wii", "Nintendo", 2008),
("GameCube", "Nintendo", 2006),
("PS3", "Sony", 2006);


INSERT INTO PlaysIn
VALUES ("Overtaker", "aaa"),
("Anywehe", "bbb"),
("Sally", "bbb"),
("Adam", "ccc"),
("Zahgrd", "aaa"),
("Victory", "ddd"),
("Christian", "eee"),
("Hauntzer", "fff");


INSERT INTO Tournament
VALUES ("aaa", "THE SMASHERS", "Taryn Wou", "2021-01-04", "2021-01-05", "2000"),
("bbb", "MEOWZERS", "Vanessa Lee", "2022-08-09", "2022-08-11", "30000"),
("ccc", "Ultra Tournament", "Isaac Chung", "2022-08-09", "2022-08-11", "30000"),
("ddd", "Sentinals", "Kitty Liu","“2022-08-09", "2022-08-11", "30000"),
("eee", "100 Thieves", "Angelina Hsu","2022-08-09", "2022-08-11", "30000"),
("fff", "Vancouver Smash Tournament", "Ellen Yang", "2022-08-09", "2022-08-11", "30000"),
("ggg", "Canadian Nationals", "Andrea Yeo", "2022-08-09", "2022-8-11", "30000"),
("hhh", "BC Provincials", "Annie Wang", "2022-06-16", "2022-06-18", "30000");


INSERT INTO Smash_Character
VALUES ("Bowser", "orange"),
("Mario", "red"),
("Peach", "pink"),
("Yoshi", "green"),
("Wario", "purple"),
("Daisy", "yellow"),
("Pikachu", "green"),
("Kirby", "pink");


INSERT INTO Ability
VALUES ("Super Jump Punch", "F.L.U.D.D", "Fireball"),
("Peach Parasol", "Vegetable", "Toad"),
("EggThrow", "Yoshi Bomb", "Egg Lay"),
("Corkscrew", "Wario Waft", "Chomp"),
("Daisy Parasol", "Vegetable", "Toad"),
("Quick Attack", "Thunder", "Thunder Jolt"),
("Final Cutter", "Stone", "Inhale");


INSERT INTO Stage
VALUES ("Battlefield", "Battlefield"),
("Super Happy Tree", "Omega"),
("Spring Stadium", "Omega"),
("Windy Hill Zone", "Battlefield"),
("Mario Galaxy", "Normal"),
("Mushroom Kingdom I", "Normal"),
("Big Blue", "Battlefield");


INSERT INTO Stage_In_GameMode
VALUES ("Battlefield", "Smash"),
("Super Happy Tree", "Squad Strike"),
("Spring Stadium", "Smash"),
("Windy Hill Zone", "Tournament"),
("Mario Galaxy", "Smash"),
("Mushroom Kingdom I", "Squad Strike"),
("Big Blue", "Squad Strike");


INSERT INTO Game
VALUES (40, "Battlefield", "Digby", "Neutral", "Primary"),
(5, "Omega", "Seliph", "Attack", "Primary"),
(263, "Battlefield", "Mr. Sandman", "Attack", "Primary"),
(2634, "Normal", "Winky", "Attack", "Support"),
(234, "Normal", "Rocky", "Instadrop", "Support"),
(2345, "Normal", "Party Phil", "Shield", "Support"),
(12873, "Battlefield", "Wind Fish", "Attack", "Support");


INSERT INTO Single_Player
VALUES (4, "Smash", "CPU"),
(193, "Smash", "Player"),
(98, "Smash","CPU"),
(1521, "Smash", "CPU"),
(7, "Squad Strike", "CPU"),
(31, "Squad Strike", "Player"),
(110, "Squad Strike", "CPU"),
(90, "Tournament", "CPU");


INSERT INTO Multiplayer
VALUES (390, "Tournament", 4),
(17, "Squad Strike", 6),
(123, "Smash", 5),
(982, "Tournament", 8),
(153, "Smash", 5),
(1230, "Squad Strike", 2),
(263, "Tournament", 7);

INSERT INTO Contains_Spirits
VALUES ("Mario", "Fight", "Fighter", "aaa"),
("Mini Mario & Hammers", "Longer Hammer Duration", "Primary", "bbb"),
("Huey", "Higher Water/Freezing Resist", "Support", "ccc"),
("Vivian", "Lower Weight", "Primary", "ddd"),
("Rock Mario", "Higher Physical Attack", "Support", "eee"),
("Cat Princess Peach", "Lower Weight", "Primary", "fff"),
("Captain Toad", "Item Gravitation", "Primary", "ggg");

INSERT INTO Ruleset 
VALUES ("Stock", "2", "aaa"),
("Time limit", "3", "bbb"),
("Stamina", "1", "ccc"),
("Stock", "2", "ddd"),
("Stock", "2", "eee"),
("Stamina", "2", "fff"),
("Time limit", "2", "ggg");
