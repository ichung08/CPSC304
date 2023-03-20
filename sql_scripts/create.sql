CREATE TABLE Player (
	username CHAR(20),
	ranking INTEGER, 
    wins INTEGER, 
    losses INTEGER, 
    character_name CHAR(20) NOT NULL,
    console_name CHAR(20) NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (character_name) REFERENCES Smash_Character (character_name) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (console_name) REFERENCES Plays_On_Console(console_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Plays_On_Console (
	console_name CHAR(20),
	manufacturer CHAR(20), 
	production_year INTEGER,
	PRIMARY KEY (console_name)
);

CREATE TABLE Plays_In (
	username CHAR(20) NOT NULL,
	tournament_id CHAR(20) NOT NULL,
	PRIMARY KEY (username, tournament_id),
	FOREIGN KEY (username) REFERENCES Player (username) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (tournament_id) REFERENCES Tournament (tournament_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Tournament (
	tournament_id CHAR(20), 
    tournament_name CHAR(20), 
    organizer CHAR(20), 
    start_date DATE, 
    end_date DATE, 
    prize_pool INTEGER,
    PRIMARY KEY (tournament_id)
);
        
CREATE TABLE Smash_Character (
    character_name CHAR(20), 
    costume CHAR(20),
    ultimate_attack CHAR(20) UNIQUE NOT NULL,
    stage_name CHAR(20),
    PRIMARY KEY (character_name), 
    FOREIGN KEY (ultimate_attack) REFERENCES Ability (ultimate_attack) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (stage_name) REFERENCES Stage (stage_name) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE Ability (
    ultimate_attack CHAR(20), 
    up_attack CHAR(20), 
    neutral_attack CHAR(20), 
    down_attack CHAR(20), 
    character_name CHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (ultimate_attack), 
    FOREIGN KEY (character_name) REFERENCES Smash_Character (character_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE Stage (
    stage_name CHAR(20), 
    form CHAR(20), 
    PRIMARY KEY (stage_name)
);

CREATE TABLE Stage_In_Game (
    stage_name CHAR(20) NOT NULL, 
    game_id CHAR(20) NOT NULL,
    PRIMARY KEY (stage_name, game_id), 
    FOREIGN KEY (stage_name) REFERENCES Stage (stage_name)ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (game_id) REFERENCES Game (game_id)ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Game ( 
    game_id INTEGER,
    game_mode CHAR(20), 
    type CHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (type) REFERENCES Ruleset (type) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE Contains_Spirits (
    spirits_name CHAR(20), 
    spirits_ability CHAR(20), 
    spirits_type CHAR(20), 
    game_id CHAR(20),
    PRIMARY KEY (spirits_name, game_id),
    FOREIGN KEY (game_id) REFERENCES Game (game_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Single_Player (
	game_id INTEGER,
    competitor_type CHAR(20), 
    PRIMARY KEY(game_id)
    FOREIGN KEY (game_id) REFERENCES Game (game_id)
);

CREATE TABLE Multiplayer (
    game_id INTEGER, 
    number_of_players INTEGER, 
    PRIMARY KEY(game_id)
    FOREIGN KEY (game_id) REFERENCES Game (game_id)
);

CREATE TABLE Ruleset ( 
    type CHAR(20), 
    win_criteria CHAR(20), 
    game_id CHAR(20), 
    PRIMARY KEY(type), 
    FOREIGN KEY(game_id) REFERENCES Game (game_id) ON DELETE CASCADE ON UPDATE CASCADE
);
