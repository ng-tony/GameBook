CREATE TABLE Review(
    userID CHAR(64),
    gameID CHAR(64),
    review_text TEXT,   
    time_stamp DATETIME,
    rating DOUBLE,
    PRIMARY KEY(userID,gameID),
    FOREIGN KEY(userID) REFERENCES User(EMAIL),
    FOREIGN KEY(gameID) REFERENCES Games(GameID)
);