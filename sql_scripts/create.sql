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

/* Renamed Game to Match, as game felt ambiguous */
CREATE TABLE Match (  /*need to fix ruleset*/
    match_id INTEGER,
    match_mode CHAR(20), 
    PRIMARY KEY(match_id),

    type CHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (type) REFERENCES Ruleset (type) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/* Match_Player = player who plays in a match */
CREATE TABLE Match_Player ( /*done*/
	match_id INTEGER,
    username CHAR(20),
    character_name CHAR(20) NOT NULL, 
	PRIMARY KEY (match_id, username),
	FOREIGN KEY (match_id) REFERENCES Match(match_id) ON DELETE CASCADE ON UPDATE CASCADE,
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

/* Match_Tournament signifies a match (game) in the tournament*/
CREATE TABLE Match_Tournament (
    match_id INTEGER,
    tournament_id INTEGER NOT NULL,
    PRIMARY KEY (match_id),
    FOREIGN KEY (match_id) REFERENCES Match(match_id) ON DELETE CASCADE ON UPDATE CASCADE,
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

CREATE TABLE Stage_In_Match ( /*edited*/
    stage_name CHAR(20), 
    match_id CHAR(20) NOT NULL,
    PRIMARY KEY (stage_name), 
    FOREIGN KEY (stage_name) REFERENCES Stage (stage_name)ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (match_id) REFERENCES Match (match_id)ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Contains_Spirits (
    spirits_name CHAR(20), 
    spirits_ability CHAR(20), 
    spirits_type CHAR(20), 
    match_id CHAR(20),
    PRIMARY KEY (spirits_name, match_id),
    FOREIGN KEY (match_id) REFERENCES Match (match_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Single_Player (
	match_id INTEGER,
    competitor_type CHAR(20), 
    PRIMARY KEY(match_id)
    FOREIGN KEY (match_id) REFERENCES Match (match_id)
);

CREATE TABLE Multiplayer (
    match_id INTEGER, 
    number_of_players INTEGER, 
    PRIMARY KEY(match_id)
    FOREIGN KEY (match_id) REFERENCES Match (match_id)
);

CREATE TABLE Ruleset ( 
    type CHAR(20), 
    win_criteria CHAR(20), 
    match_id CHAR(20), 
    PRIMARY KEY(type), 
    FOREIGN KEY(match_id) REFERENCES Match (match_id) ON DELETE CASCADE ON UPDATE CASCADE
);





