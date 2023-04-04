
CREATE TABLE Player ( 
	username CHAR(20),
	country CHAR(20), 
    wins INTEGER, 
    losses INTEGER, 
    PRIMARY KEY (username)
);

CREATE TABLE Stage ( 
    stage_name CHAR(20), 
    form CHAR(20), 
    PRIMARY KEY (stage_name)
);

CREATE TABLE Smash_Character ( 
    character_name CHAR(20), 
    costume CHAR(20),
    PRIMARY KEY (character_name)
); 

CREATE TABLE Ruleset ( 
    ruleset_type CHAR(20), 
    win_criteria CHAR(50), 
    PRIMARY KEY(ruleset_type)
);

CREATE TABLE Spirits (
    spirits_name CHAR(20), 
    spirits_ability CHAR(50), 
    spirits_type CHAR(20),
    PRIMARY KEY (spirits_name)
);

CREATE TABLE Game (  
    game_id INTEGER,
    console CHAR(20),
    game_mode CHAR(20), 
    stage_name CHAR(20) NOT NULL,
    ruleset_type CHAR(20) NOT NULL,
    spirits_name CHAR(20) NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/* Game_Player = player who plays in a game */
CREATE TABLE Game_Player ( 
	game_id INTEGER,
    username CHAR(20),
    character_name CHAR(20) NOT NULL, 
	PRIMARY KEY (game_id, username),
	FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES Player(username) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (character_name) REFERENCES Smash_Character(character_name) 
); 

CREATE TABLE Tournament ( 
	tournament_id INTEGER, 
    tournament_name CHAR(80), 
    organizer CHAR(20), 
    startdate DATE, 
    enddate DATE, 
    prize_pool INTEGER,
    PRIMARY KEY (tournament_id)
);

/* Game_Tournament signifies a game in the tournament*/
CREATE TABLE Game_Tournament (
    game_id INTEGER,
    tournament_id INTEGER NOT NULL,
    PRIMARY KEY (game_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tournament_id) REFERENCES Tournament(tournament_id) ON DELETE CASCADE ON UPDATE CASCADE
);
        

CREATE TABLE Ability ( 
    character_name CHAR(20),
    ultimate_attack CHAR(20), 
    up_attack CHAR(20), 
    neutral_attack CHAR(20), 
    down_attack CHAR(20), 
    PRIMARY KEY (character_name, ultimate_attack), 
    UNIQUE (character_name),
    FOREIGN KEY (character_name) REFERENCES Smash_Character (character_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Single_Player_Game (
	game_id INTEGER,
    competitor_type CHAR(20), 
    console CHAR(20),
    game_mode CHAR(20), 
    stage_name CHAR(20) NOT NULL,
    ruleset_type CHAR(20) NOT NULL,
    spirits_name CHAR(20) NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE Multiplayer_Game (
    game_id INTEGER,
    number_of_players INTEGER,  
    console CHAR(20),
    game_mode CHAR(20), 
    stage_name CHAR(20) NOT NULL,
    ruleset_type CHAR(20) NOT NULL,
    spirits_name CHAR(20) NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/* 1) username, country, wins, losses */
INSERT INTO Player
VALUES ("Overtaker", "Canada", 59, 5),
("Anywehe", "South Korea", 64, 12),
("Sally", "India", 23, 6),
("Adam", "China", 49, 6),
("Zahgrd", "Australia", 5, 86),
("Victory", "Australia", 35, 9),
("Christian", "Philippines", 23, 5),
("Hauntzer", "Philippines", 45, 46),
("GameOn92", "USA", 15, 8),
("NinjaGamer", "Canada", 20, 5),
("TheGamingGeek", "USA", 18, 6),
("PixelWarrior", "UK", 14, 10),
("VirtualAssassin", "Canada", 22, 3),
("RetroGamerX", "Australia", 12, 12),
("EliteGamingPro", "UK", 16, 9),
("ThunderBolt", "USA", 21, 4),
("CyberKnight", "Canada", 19, 7),
("EpicGamer88", "Australia", 17, 11),
("Ninja", "USA", 15, 5),
("Shroud", "Canada", 12, 8),
("Faker", "South Korea", 20, 2),
("PewDiePie", "Sweden", 8, 12),
("Summit1g", "USA", 18, 3);

/* 2) stage_name, form*/
INSERT INTO Stage
VALUES ("Battlefield", "Battle"),
("Super Happy Tree", "Omega"),
("Spring Stadium", "Omega"),
("Windy Hill Zone", "Battle"),
("Mario Galaxy", "Normal"),
("Mushroom Kingdom I", "Normal"),
("Big Blue", "Battle"),
("Final Destination", "Omega"),
("Yoshi Island", "Melee"),
("Lylat Cruise", "64");

/* 3) character_name, costume*/
INSERT INTO Smash_Character
VALUES ("Bowser", "orange"),
("Mario", "red"),
("Princess Peach", "pink"),
("Yoshi", "green"),
("Wario", "purple"),
("Daisy", "yellow"),
("Pikachu", "green"),
("Kirby", "pink"),
("Boo", "Red"),
("Donkey Kong", "Blue");

/* 4) ruleset_type, win_criteria*/
INSERT INTO Ruleset 
VALUES ("Stock", "3 stock"),
("Time limit", "6 minutes"),
("Stamina", "Highest health meter"),
("Coin", "Practice"),
("Squad Strike", "Last team eliminated"),
("Tournament", "Bracketed style"),
("All-Star Mode", "Set opponents"),
("Target Blast", "Damage dealt points");

/* 5) spirits_name CHAR(20), spirits_ability CHAR(20), spirits_type CHAR(20) */
INSERT INTO Spirits
VALUES ("Mario", "Fight", "Fighter"),
("Huey", "Freezing Resist", "Support"),
("Vivian", "Lower Weight", "Primary"),
("Cat Princess Peach", "Lower Weight", "Primary"),
("Captain Toad", "Item Gravitation", "Primary"),
("Dry Bowser", "Flame proof", "Advanced"),
("Diddy", "Power Increase", "Novice"),
("Waluigi", "Foot Attack", "Ace"),
("Cappy", "Midair jump", "Ace"),
("Fawful", "Resist status", "Advanced");

/* 6) game_id, console, game_mode, stage_name, ruleset_type, spirits_name, */
INSERT INTO Game
VALUES (1, "Nintendo Switch", "Classic", "Battlefield", "Stock", "Mario"),
(2, "Nintendo Switch", "Training", "Big Blue", "Time limit", "Waluigi"),
(3, "Playstation 4", "Classic", "Yoshi Island", "Squad Strike", "Huey"),
(4, "Nintendo Switch", "All-Star", "Yoshi Island", "Time limit", "Vivian"),
(5, "Xbox One", "Stadium", "Final Destination", "Stock", "Captain Toad"),
(6, "Playstation 4", "Training", "Mushroom Kingdom I", "Coin", "Cappy"),
(7, "Nintendo Switch", "Event", "Lylat Cruise", "Time limit", "Fawful"),
(8, "Xbox One", "Event", "Mushroom Kingdom I", "Stock", "Diddy"),
(9, "Playstation 4", "Mario Galaxy", "Battlefield", "Coin", "Cat Princess Peach"),
(10, "Nintendo Switch", "Mario Galaxy", "Final Destination", "Time limit", "Fawful"),
(11, "Xbox One", "Stadium", "Lylat Cruise", "Stock", "Diddy"),
(12, "Playstation 4", "All-Star", "Windy Hill Zone", "Coin", "Diddy"),
(13, "Nintendo Switch", "Training", "Spring Stadium", "Target Blast", "Vivian"),
(14, "Xbox One", "Mario Galaxy", "Windy Hill Zone", "Stock", "Mario"),
(15, "Playstation 4", "Classic", "Final Destination", "Coin", "Fawful"),
(16, "Xbox One", "Training", "Yoshi Island", "Target Blast", "Huey"),
(17, "Playstation 4", "Event", "Final Destination", "Coin", "Huey"),
(18, "Xbox One", "Classic", "Lylat Cruise", "Stock", "Huey"),
(19, "Playstation 4", "Stadium", "Final Destination", "Coin", "Vivian"),
(20, "Playstation 4", "All-Star", "Battlefield", "Coin", "Dry Bowser");

/* 7) game_id INTEGER, username CHAR(20), character_name */
INSERT INTO Game_Player
VALUES (1, "Overtaker", "Mario"),
(1, "Anywehe", "Yoshi"),
(1, "Sally", "Pikachu"),
(2, "Adam", "Pikachu"),
(2, "Zahgrd", "Kirby"),
(3, "Victory", "Wario"),
(3, "Christian", "Mario"),
(3, "Hauntzer", "Donkey Kong"),
(3, "GameOn92", "Daisy"),
(3, "NinjaGamer", "Mario"),
(4, "TheGamingGeek", "Pikachu"),
(5, "PixelWarrior", "Boo"),
(6, "VirtualAssassin", "Bowser"),
(7, "RetroGamerX", "Yoshi"),
(7, "EliteGamingPro", "Wario"),
(8, "ThunderBolt", "Princess Peach"),
(9, "CyberKnight", "Kirby"),
(10, "EpicGamer88", "Kirby"),
(10, "Ninja", "Mario"),
(11, "Shroud", "Daisy"),
(11, "Faker", "Princess Peach"),
(12, "PewDiePie", "Boo"),
(13, "Summit1g", "Bowser");


/* 8) tournament_id, tournament_name, organizer, start_date, end_date, prize_pool */
INSERT INTO Tournament VALUES
(100, 'ESL One Hamburg 2013', 'ESL Gaming', '2013-11-16', '2013-11-17', 155000),
(200, 'Smash Worlds 2019', 'Riot Games', '2019-10-02', '2019-11-10', 2500000),
(300, 'ESL One LA 2020', 'ESL Gaming', '2020-03-28', '2020-04-19', 400000),
(400, 'Asia Championships 2021', 'Perfect World', '2021-04-01', '2021-04-04', 500000),
(500, 'PUBG Global Invitational 2021', 'PUBG Corporation', '2021-02-05', '2021-03-28', 7000000),
(600, 'Smash Championships 2021', 'Activision Blizzard', '2021-08-19', '2021-08-22', 2500000),
(700, 'Rainbow Six Siege Invitational 2022', 'Ubisoft', '2022-02-09', '2022-02-20', 3000000),
(800, 'Smash World Cup 2022', 'Epic Games', '2022-07-22', '2022-07-24', 50000000),
(900, 'The International 2022', 'Valve Corporation', '2022-08-18', '2022-08-28', 30000000),
(1000, 'ESL Amsterdam', 'Valve Corporation', '2023-01-19', '2023-01-29', 2000000);


/* 9) game_id, tournament_id */
INSERT INTO Game_Tournament
VALUES (1, 100),
(2, 100),
(3, 200),
(4, 300),
(5, 300),
(6, 300),
(7, 300),
(8, 400),
(9, 500),
(10, 500),
(11, 500),
(12, 600),
(13, 600),
(14, 700),
(15, 800),
(16, 800),
(17, 900),
(18, 900),
(19, 900),
(20, 1000);

        
/* 10) character_name CHAR(20), ultimate_attack CHAR(20), cup_attack CHAR(20), neutral_attack CHAR(20), down_attack CHAR(20) */
INSERT INTO Ability
VALUES ("Bowser", "Final Cutter", "Stone", "Inhale", "Flame"),
("Mario", "Super Jump Punch", "FLUDD", "Fireball", "Hero"),
("Princess Peach", "Peach Parasol", "Vegetable", "Toad", "Spin"),
("Yoshi", "EggThrow", "Yoshi Bomb", "Egg Lay", "Crouch"),
("Wario", "Corkscrew", "Wario Waft", "Chomp", "Spin"),
("Daisy", "Daisy Parasol", "Vegetable", "Toad", "Slash"),
("Pikachu", "Throw", "Fire Spit", "Jump", "Thunderbolt"),
("Kirby", "Quick Attack", "Thunder", "Jolt", "Jump"),
("Boo", "Quick Shift", "Ghost Mode", "Sting", "Teleport"),
("Donkey Kong", "Extra Strength", "Power Jump", "Sumo", "Crouch");


/* 11) game_id, competitor_type, console, game_mode, stage_name, ruleset_type, spirits_name*/

INSERT INTO Single_Player_Game
VALUES (1, "CPU", "Nintendo Wii",  "Classic", "Battlefield", "Stock", "Mario"),
(3, "CPU", "Playstation 4", "Classic", "Yoshi Island", "Squad Strike", "Huey"),
(5, "Player", "Xbox One", "Stadium", "Final Destination", "Stock", "Captain Toad"),
(7, "Player", "Nintendo Switch", "Event", "Lylat Cruise", "Time limit", "Fawful"),
(9, "CPU", "Playstation 4", "Mario Galaxy", "Battlefield", "Coin", "Cat Princess Peach"),
(11, "Player", "Xbox One", "Stadium", "Lylat Cruise", "Stock", "Diddy"),
(13, "CPU", "Nintendo Switch", "Training", "Spring Stadium", "Target Blast", "Vivian"),
(15, "Player", "Playstation 4", "Event", "Final Destination", "Coin", "Fawful"),
(17, "CPU", "Playstation 4", "Event", "Final Destination", "Coin", "Huey"),
(19, "Player", "Playstation 4", "Stadium", "Final Destination", "Coin", "Vivian");



/* 12) game_id, number_of_players, console, game_mode, stage_name, ruleset_type, spirits_name*/
INSERT INTO Multiplayer_Game
VALUES (2, 3, "Nintendo Switch", "Training", "Big Blue", "Time limit", "Waluigi"),
(4, 5, "Nintendo Switch", "All-Star", "Yoshi Island", "Time limit", "Vivian"),
(6, 8, "Playstation 4", "Training", "Mushroom Kingdom I", "Coin", "Cappy"),
(8, 7, "Xbox One", "Event", "Mushroom Kingdom I", "Stock", "Diddy"),
(10, 3, "Nintendo Switch", "Mario Galaxy", "Final Destination", "Time limit", "Fawful"),
(12, 3, "Playstation 4", "All-Star", "Windy Hill Zone", "Coin", "Diddy"),
(14, 6, "Xbox One", "Mario Galaxy", "Windy Hill Zone", "Stock", "Mario"),
(16, 6, "Xbox One", "Training", "Yoshi Island", "Target Blast", "Huey"),
(18, 5, "Xbox One", "Classic", "Lylat Cruise", "Stock", "Huey"),
(20, 2, "Playstation 4", "All-Star", "Battlefield", "Coin", "Dry Bowser");















