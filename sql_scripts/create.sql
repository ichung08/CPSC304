DROP TABLE Game_Tournament;
DROP TABLE Tournament;
DROP TABLE Multiplayer_Game;
DROP TABLE Single_Player_Game;
DROP TABLE Ability;
DROP TABLE Game_Player;
DROP TABLE Game;
DROP TABLE Spirits;
DROP TABLE Ruleset;
DROP TABLE Smash_Character;
DROP TABLE Stage;
DROP TABLE Player;

CREATE TABLE Player ( 
	username CHAR(20),
	country CHAR(20), 
    ranking_level CHAR(20), 
    age INTEGER,
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
    FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
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
    FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/* 1) username, country, ranking_level, age, wins, losses */
INSERT INTO Player
VALUES ("Overtaker", "Canada", "platinum", 22, 59, 5),
("Anywehe", "South Korea", "platinum", 21, 64, 12),
("Sally", "India", "bronze", 17, 23, 6),
("Adam", "China", "gold", 16, 49, 6),
("Zahgrd", "Australia", "beginner", 14, 5, 86),
("Victory", "Australia", "silver", 30, 35, 9),
("Christian", "Philippines", "bronze", 26, 23, 5),
("Hauntzer", "Philippines", "gold", 27, 45, 46),
("GameOn92", "USA", "beginner", 40, 15, 8),
("NinjaGamer", "Canada", "bronze", 29, 20, 5),
("TheGamingGeek", "USA", "beginner", 15, 18, 6),
("PixelWarrior", "UK", "beginner", 13, 14, 10),
("VirtualAssassin", "Canada", "bronze", 16, 22, 3),
("RetroGamerX", "Australia", "silver", 35, 33, 12),
("EliteGamingPro", "UK", "gold", 22, 45, 9),
("ThunderBolt", "USA", "silver", 31, 34, 4),
("CyberKnight", "Canada", "bronze", 28, 29, 7),
("EpicGamer88", "Australia", "beginner", 12, 17, 11),
("Ninja", "USA", "platinum", 50, 53, 5),
("Shroud", "Canada", "silver", 33, 33, 8),
("Faker", "South Korea", "diamond", 20, 54, 2),
("PewDiePie", "Sweden", "platinum", 35, 60, 12),
("Summit1g", "USA", "diamond", 18, 101, 3),
("Chungus", "USA", "diamond", 20, 69, 40),
("Hungry", "Brazil", "silver", 20, 5, 13),
("XQC", "Canada", "diamond", 20, 100, 0);

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
("Donkey Kong", "Blue"),
("Jigglypuff", "pink"),
("Falco", "blue"),
("Ice Climbers", "red"),
("Mewtwo", "purple"),
("Zelda", "Green"),
("Link", "green"),
("Samus", "orange"),
("Fox", "orange"),
("Captain Falcon", "blue"),
("Ness", "blue"),
("Luigi", "green");

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
(20, "Playstation 4", "All-Star", "Battlefield", "Coin", "Dry Bowser"),
(21, 'Nintendo Switch', 'Classic', 'Final Destination', 'Target Blast', 'Fawful'),
(22, 'Wii U', 'Stadium', 'Spring Stadium', 'Time limit', 'Diddy'),
(23, 'Wii U', 'All-Star', 'Yoshi Island', 'Coin', 'Captain Toad'),
(24, 'Xbox One', 'Training', 'Mushroom Kingdom I', 'Target Blast', 'Mario'),
(25, 'Playstation 4', 'Event', 'Spring Stadium', 'Stock', 'Waluigi');

/* 7) game_id INTEGER, username CHAR(20), character_name */
INSERT INTO Game_Player
VALUES (1, "Overtaker", "Mario"),
(2, "Hauntzer", "Yoshi"),
(2, "Overtaker", "Pikachu"),
(2, "Adam", "Pikachu"),
(3, "Zahgrd", "Kirby"),
(4, "Victory", "Wario"),
(4, "Christian", "Mario"),
(4, "Adam", "Donkey Kong"),
(4, "GameOn92", "Daisy"),
(4, "NinjaGamer", "Mario"),
(5, "Hauntzer", "Pikachu"),
(6, "PewDiePie", "Boo"),
(6, "Overtaker", "Bowser"),
(6, "RetroGamerX", "Yoshi"),
(6, "EliteGamingPro", "Wario"),
(6, "ThunderBolt", "Princess Peach"),
(6, "CyberKnight", "Kirby"),
(6, "EpicGamer88", "Kirby"),
(6, "Ninja", "Mario"),
(7, "Shroud", "Daisy"),
(8, "Faker", "Princess Peach"),
(8, "PewDiePie", "Boo"),
(9, "Summit1g", "Bowser"),
(10, "Overtaker", "Mario"),
(10, "Anywehe", "Yoshi"),
(10, "Sally", "Pikachu"),
(11, "Adam", "Pikachu"),
(12, "Zahgrd", "Kirby"),
(12, "Victory", "Wario"),
(12, "Christian", "Mario"),
(13, "Hauntzer", "Donkey Kong"),
(14, "GameOn92", "Daisy"),
(14, "Overtaker", "Mario"),
(14, "TheGamingGeek", "Pikachu"),
(14, "PixelWarrior", "Boo"),
(14, "VirtualAssassin", "Mario"),
(14, "RetroGamerX", "Pikachu"),
(15, "Sally", "Yoshi"),
(16, "Sally", "Princess Peach"),
(16, "CyberKnight", "Wario"),
(17, "EpicGamer88", "Mario"),
(18, "Ninja", "Princess Peach"),
(18, "Shroud", "Kirby"),
(18, "Faker", "Daisy"),
(19, "PewDiePie", "Boo"),
(20, "Overtaker", "Kirby"),
(20, "TheGamingGeek", "Boo"),
(21, "RetroGamerX", "Ice Climbers"),
(22, "Anywehe", "Kirby"),
(22, "Overtaker", "Falco"),
(22, "Ninja", "JigglyPuff"),
(22, "Adam", "Ness"),
(23, "Ninja", "Daisy"),
(24, "Ninja", "Bowser"),
(24, "Overtaker", "Mario"),
(24, "Anywehe", "Yoshi"),
(24, "Faker", "Link"),
(24, "PewDiePie", "Luigi"),
(25, "Ninja", "Samus");


/* 8) tournament_id, tournament_name, organizer, start_date, end_date, prize_pool */
INSERT INTO Tournament VALUES
(101, 'ESL One Hamburg 2015', 'ESL Gaming', '2015-11-16', '2015-11-17', 155000),
(102, "Get On My Line 2016", "Even Matchup Gaming", "2016-06-25", "2016-06-26", 10000),
(103, "Low Tier City 8", "Tourney Locator", "2017-07-29", "2017-07-31", 10000),
(104, "Smash Ultimate World Tour 2018", "Nintendo", "2018-03-02", "2018-12-08", 250000),
(105, 'Smash Worlds 2019', 'Riot Games', '2019-10-02', '2019-11-10', 2500000),
(106, 'ESL One LA 2020', 'ESL Gaming', '2020-03-28', '2020-04-19', 400000),
(107, "EVO 2020 Online", "EVO", "2020-07-04", "2020-08-02", 39000),
(108, 'Asia Championships 2021', 'Perfect World', '2021-04-01', '2021-04-04', 500000),
(109, 'PUBG Global Invitational 2021', 'PUBG Corporation', '2021-02-05', '2021-03-28', 7000000),
(110, "Smash Ultimate Summit 3", "Beyond The Summit", "2021-05-06", "2021-05-09", 150000),
(111, 'Smash Championships 2021', 'Activision Blizzard', '2021-08-19', '2021-08-22', 2500000),
(112, 'Rainbow Six Siege Invitational 2022', 'Ubisoft', '2022-02-09', '2022-02-20', 3000000),
(113, 'Smash World Cup 2022', 'Epic Games', '2022-07-22', '2022-07-24', 50000000),
(114, 'The International 2023', 'Valve Corporation', '2023-08-18', '2023-08-28', 30000000),
(115, 'ESL Amsterdam 2023', 'Valve Corporation', '2024-01-19', '2024-01-29', 2000000);


/* 9) game_id, tournament_id */
INSERT INTO Game_Tournament
VALUES (1, 101),
(2, 101),
(3, 102),
(4, 103),
(5, 103),
(6, 103),
(7, 103),
(8, 104),
(9, 105),
(10, 105),
(11, 105),
(12, 106),
(13, 106),
(14, 107),
(15, 108),
(16, 108),
(17, 109),
(18, 109),
(19, 109),
(20, 110),
(21, 111),
(22, 112),
(23, 112),
(24, 112),
(25, 112);

        
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
("Donkey Kong", "Power", "Jump", "Spin", "Crouch"),
("Luigi", "Poltergust", "Jump Punch", "Fireball", "Missile"),
("Jigglypuff", "Puff Up", "Sing", "Rollout", "Rest"),
("Falco", "Landmaster", "Fire Bird", "Blaster", "Reflector"),
("Ice Climbers", "Iceberg", "Hammer", "Ice Shot", "Blizzard"),
("Mewtwo", "Psystrike", "Teleport", "Shadow Ball", "Disable");


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
(19, "Player", "Playstation 4", "Stadium", "Final Destination", "Coin", "Vivian"),
(21, "Player", 'Nintendo Switch', 'Classic', 'Final Destination', 'Target Blast', 'Fawful'),
(23, "CPU", 'Wii U', 'All-Star', 'Yoshi Island', 'Coin', 'Captain Toad'),
(25, "CPU", 'Playstation 4', 'Event', 'Spring Stadium', 'Stock', 'Waluigi');


/* 12) game_id, number_of_players, console, game_mode, stage_name, ruleset_type, spirits_name*/
INSERT INTO Multiplayer_Game
VALUES (2, 3, "Nintendo Switch", "Training", "Big Blue", "Time limit", "Waluigi"),
(4, 5, "Nintendo Switch", "All-Star", "Yoshi Island", "Time limit", "Vivian"),
(6, 8, "Playstation 4", "Training", "Mushroom Kingdom I", "Coin", "Cappy"),
(8, 2, "Xbox One", "Event", "Mushroom Kingdom I", "Stock", "Diddy"),
(10, 3, "Nintendo Switch", "Mario Galaxy", "Final Destination", "Time limit", "Fawful"),
(12, 3, "Playstation 4", "All-Star", "Windy Hill Zone", "Coin", "Diddy"),
(14, 6, "Xbox One", "Mario Galaxy", "Windy Hill Zone", "Stock", "Mario"),
(16, 2, "Xbox One", "Training", "Yoshi Island", "Target Blast", "Huey"),
(18, 3, "Xbox One", "Classic", "Lylat Cruise", "Stock", "Huey"),
(20, 2, "Playstation 4", "All-Star", "Battlefield", "Coin", "Dry Bowser"),
(22, 4, 'Wii U', 'Stadium', 'Spring Stadium', 'Time limit', 'Diddy'),
(24, 5, 'Xbox One', 'Training', 'Mushroom Kingdom I', 'Target Blast', 'Mario');














