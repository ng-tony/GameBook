CREATE TABLE Likes(
    userID CHAR(64),
    gameID CHAR(64), 
    timestamp DATETIME,
    PRIMARY KEY(userID,gameID),
    FOREIGN KEY(userID) REFERENCES User(EMAIL),
    FOREIGN KEY(gameID) REFERENCES Games(GameID)
)