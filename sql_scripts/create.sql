
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
VALUES ("Overtaker", "Canada", 509, 5),
("Anywehe", "South Korea", 634, 12),
("Sally", "India", 23, 6),
("Adam", "China", 498, 6),
("Zahgrd", "Australia", 5, 86),
("Victory", "Australia", 345, 9),
("Christian", "Philippines", 236, 5),
("Hauntzer", "Philippines", 145, 46);

/* 2) stage_name, form*/
INSERT INTO Stage
VALUES ("Battlefield", "Battle"),
("Super Happy Tree", "Omega"),
("Spring Stadium", "Omega"),
("Windy Hill Zone", "Battle"),
("Mario Galaxy", "Normal"),
("Mushroom Kingdom I", "Normal"),
("Big Blue", "Battle");

/* 3) character_name, costume*/
INSERT INTO Smash_Character
VALUES ("Bowser", "orange"),
("Mario", "red"),
("Princess Peach", "pink"),
("Yoshi", "green"),
("Wario", "purple"),
("Daisy", "yellow"),
("Pikachu", "green"),
("Kirby", "pink");

/* 4) ruleset_type, win_criteria*/
INSERT INTO Ruleset 
VALUES ("Stock", "3 stock"),
("Time limit", "6 minutes"),
("Stamina", "Highest health meter"),
("Training", "Practice"),
("Squad Strike", "Last team eliminated"),
("Tournament", "Bracketed style"),
("All-Star Mode", "Set opponents"),
("Target Blast", "Damage dealt points");

/* 5) spirits_name CHAR(20), spirits_ability CHAR(20), spirits_type CHAR(20) */
INSERT INTO Spirits
VALUES ("Mario", "Fight", "Fighter"),
("Mini Mario Hammer", "Longer Hammer", "Primary"),
("Huey", "Freezing Resist", "Support"),
("Vivian", "Lower Weight", "Primary"),
("Rock Mario", "Physical Attack", "Support"),
("Cat Princess Peach", "Lower Weight", "Primary"),
("Captain Toad", "Item Gravitation", "Primary");

/* 6) game_id, console, game_mode, stage_name, ruleset_type, spirits_name, */
INSERT INTO Game
VALUES (40, "Xbox", "Classic", "Battlefield", "Time limit", "Mario"),
(5, "PS3", "Adventure", "Mario Galaxy", "Stamina", "Vivian"),
(263, "Nintendo Switch", "All-Star", "Super Happy Tree", "Stock", "Captain Toad"),
(2634, "Nintendo Switch", "Event", "Windy Hill Zone", "Stock", "Cat Princess Peach"),
(234, "GameCube", "Stadium", "Spring Stadium", "Stamina", "Huey"),
(2345, "Wii", "Training", "Mushroom Kingdom I", "Time limit", "Captain Toad"),
(12873, "Nintendo 64", "Classic", "Big Blue", "Stock", "Mini Mario Hammer");


/* 7) game_id INTEGER, username CHAR(20), character_name */
INSERT INTO Game_Player
VALUES (40, "Anywehe", "Mario"),
(5, "Overtaker", "Princess Peach"),
(263, "Christian", "Yoshi"),
(2634, "Sally", "Daisy"),
(234, "Adam", "Wario"),
(2345, "Victory", "Pikachu"),
(12873, "Zahgrd", "Yoshi");


/* 8) tournament_id, tournament_name, organizer, start_date, end_date, prize_pool */
INSERT INTO Tournament
VALUES (1, "THE SMASHERS", "Taryn Wou", "2021-01-04", "2021-01-05", "2000"),
(15, "MEOWZERS", "Vanessa Lee", "2022-08-09", "2022-08-11", "30000"),
(17, "Ultra Tournament", "Isaac Chung", "2022-08-09", "2022-08-11", "30000"),
(5, "Sentinals", "Kitty Liu","2022-08-09", "2022-08-11", "30000"),
(200, "100 Thieves", "Angelina Hsu","2022-08-09", "2022-08-11", "30000"),
(8, "Vancouver Smash", "Ellen Yang", "2022-08-09", "2022-08-11", "30000"),
(99, "Canadian Nationals", "Andrea Yeo", "2022-08-09", "2022-8-11", "30000"),
(21, "BC Provincials", "Annie Wang", "2022-06-16", "2022-06-18", "30000");


/* 9) game_id, tournament_id */
INSERT INTO Game_Tournament
VALUES (40, 1),
(5, 15),
(263, 17),
(2634, 5),
(234, 200),
(2345, 99),
(12873, 17);

        
/* 10) character_name CHAR(20), ultimate_attack CHAR(20), cup_attack CHAR(20), neutral_attack CHAR(20), down_attack CHAR(20) */
INSERT INTO Ability
VALUES ("Mario", "Super Jump Punch", "FLUDD", "Fireball", "Hero"),
("Princess Peach", "Peach Parasol", "Vegetable", "Toad", "Spin"),
("Yoshi", "EggThrow", "Yoshi Bomb", "Egg Lay", "Crouch"),
("Wario", "Corkscrew", "Wario Waft", "Chomp", "Spin"),
("Daisy", "Daisy Parasol", "Vegetable", "Toad", "Slash"),
("Kirby", "Quick Attack", "Thunder", "Jolt", "Jump"),
("Bowser", "Final Cutter", "Stone", "Inhale", "Flame"),
("Pikachu", "Throw", "Fire Spit", "Jump", "Thunderbolt");


/* 11) game_id, competitor_type, console, game_mode, stage_name, ruleset_type, spirits_name*/

INSERT INTO Single_Player_Game
VALUES (1, "CPU", "Nintendo Wii",  "Classic", "Battlefield", "Time limit", "Mario"),
(5, "CPU", "Nintendo 64", "Adventure", "Mario Galaxy", "Stamina", "Vivian"),
(23, "Player", "PS3", "All-Star", "Super Happy Tree", "Stock", "Captain Toad"),
(96, "Player", "Xbox", "Event", "Windy Hill Zone", "Tournament", "Cat Princess Peach"),
(903, "CPU", "GameCube", "Stadium", "Spring Stadium", "Target Blast", "Huey"),
(2345, "Player", "Nintendo Wii", "Training", "Mushroom Kingdom I", "All-Star Mode", "Captain Toad"),
(12873, "CPU", "Nintendo Switch", "Classic", "Big Blue", "Training", "Mini Mario Hammer");


/* 12) game_id, number_of_players, console, game_mode, stage_name, ruleset_type, spirits_name*/
INSERT INTO Multiplayer_Game
VALUES (2, 3, "Nintendo Switch", "Classic", "Battlefield", "Time limit", "Mario"),
(90, 5, "Xbox", "Adventure", "Mario Galaxy", "Stamina", "Vivian"),
(24, 6, "Nintendo Wii", "All-Star", "Super Happy Tree", "Tournament", "Captain Toad"),
(99, 2, "Nintendo 64",  "Event", "Windy Hill Zone", "Stock", "Cat Princess Peach"),
(13, 7, "GameCube", "Stadium", "Spring Stadium", "Squad Strike", "Huey"),
(123, 8, "PS3", "Training", "Mushroom Kingdom I", "Target Blast", "Captain Toad"),
(17, 4, "Nintendo Switch", "Classic", "Big Blue", "Training", "Mini Mario Hammer");















