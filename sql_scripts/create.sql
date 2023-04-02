CREATE TABLE Player ( /* done */
	username CHAR(20),
	ranking INTEGER, 
    wins INTEGER, 
    losses INTEGER, 
    PRIMARY KEY (username),
);

CREATE TABLE Smash_Character ( /*simplified, done*/
    character_name CHAR(20), 
    costume CHAR(20),
    PRIMARY KEY (character_name), 
); 


CREATE TABLE Game (  
    game_id INTEGER,
    game_mode CHAR(20), 
    stage_name CHAR(20) UNIQUE NOT NULL,
    ruleset_type CHAR(20) UNIQUE NOT NULL,
    spirits_name CHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/* Game_Player = player who plays in a game */
CREATE TABLE Game_Player ( /*done*/
	game_id INTEGER,
    username CHAR(20),
    character_name CHAR(20) NOT NULL, 
	PRIMARY KEY (game_id, username),
	FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (username) REFERENCES Player(username) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (character_name) REFERENCES Smash_Character(character_name)
);

CREATE TABLE Tournament ( /* done */
	tournament_id CHAR(20), 
    tournament_name CHAR(20), 
    organizer CHAR(20), 
    start_date DATE, 
    end_date DATE, 
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
)
        

CREATE TABLE Ability ( /*done*/
    ultimate_attack CHAR(20), 
    character_name CHAR(20),
    up_attack CHAR(20), 
    neutral_attack CHAR(20), 
    down_attack CHAR(20), 
    UNIQUE (character_name), 
    PRIMARY KEY (ultimate_attack, character_name), 
    FOREIGN KEY (character_name) REFERENCES Smash_Character (character_name) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Stage ( /*done*/
    stage_name CHAR(20), 
    form CHAR(20), 
    PRIMARY KEY (stage_name)
);


/* CREATE TABLE Stage_In_Game (
    game_id CHAR(20), 
    stage_name CHAR(20) NOT NULL,
    PRIMARY KEY (game_id), 
    FOREIGN KEY (stage_name) REFERENCES Stage (stage_name)ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (game_id) REFERENCES Game (game_id)ON DELETE CASCADE ON UPDATE CASCADE
); 
*/

CREATE TABLE Ruleset ( 
    ruleset_type CHAR(20), 
    win_criteria CHAR(20), 
    PRIMARY KEY(ruleset_type), 
);

/*CREATE TABLE Contains_Spirits (
    spirits_name CHAR(20), 
    spirits_ability CHAR(20), 
    spirits_type CHAR(20), 
    game_id CHAR(20),
    PRIMARY KEY (spirits_name, game_id),
    FOREIGN KEY (game_id) REFERENCES Game (game_id) ON DELETE CASCADE ON UPDATE CASCADE
);
*/

CREATE TABLE Spirits (
    spirits_name CHAR(20), 
    spirits_ability CHAR(20), 
    spirits_type CHAR(20),
    PRIMARY KEY (spirits_name)
)

CREATE TABLE Single_Player_Game (
	game_id INTEGER,
    competitor_type CHAR(20), 
    game_mode CHAR(20), 
    stage_name CHAR(20) UNIQUE NOT NULL,
    ruleset_type CHAR(20) UNIQUE NOT NULL,
    spirits_name CHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE Multiplayer_Game (
    game_id INTEGER,
    number_of_players INTEGER,  
    game_mode CHAR(20), 
    stage_name CHAR(20) UNIQUE NOT NULL,
    ruleset_type CHAR(20) UNIQUE NOT NULL,
    spirits_name CHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY(game_id),
    FOREIGN KEY (stage_name) REFERENCES Stage(stage_name) ON DELETE NO ACTION ON UPDATE NO ACTION
    FOREIGN KEY (ruleset_type) REFERENCES Ruleset (ruleset_type) ON DELETE NO ACTION ON UPDATE NO ACTION
    FOREIGN KEY (spirits_name) REFERENCES Spirits(spirits_name) ON DELETE NO ACTION ON UPDATE NO ACTION
);








