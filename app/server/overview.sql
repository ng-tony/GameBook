PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Games(
   GameID          CHAR(64)    PRIMARY KEY     NOT NULL,
   Title          TEXT    NOT NULL,
   Publisher         TEXT     ,
   Developer        TEXT NOT NULL,
   Genre            TEXT,
   Price            REAL,
   RELEASE_DATE     DATE,
   DESCRIPTION      TEXT,
   PICTURE          TEXT
);
INSERT INTO Games VALUES('BJukwFb7Z','new game','abc','abc','RPG',1232.9999999999999999,'1995-05-02','asdgasgdas','ftree.c');
INSERT INTO Games VALUES('r15kjcbQW','abc','123','124','Adventure',123.0,'1997-02-06','asdgasdg','dbGUI.html');
INSERT INTO Games VALUES('SyIrsAM7W','A new game ','','','Action','','',NULL,'dbGUI.html');
INSERT INTO Games VALUES('rkSOwJX7Z','a new game','123','123124','Action','','',NULL,'dbGUI.html');
INSERT INTO Games VALUES('ry55_mXmZ','abc','241','asgasdg','Action',123.0,'',NULL,'dbGUI.html');
INSERT INTO Games VALUES('BkxoOXmQ-','abc','2424','asgasdg','Action',123.0,'',NULL,'dbGUI.html');
INSERT INTO Games VALUES('SkPIF7XXZ','abc','','','Action','','2002-02-05',NULL,'dbGUI.html');
INSERT INTO Games VALUES('H100FmmQW','abc','','','Action','','',NULL,'dbGUI.html');
INSERT INTO Games VALUES('B1klqQQm-','abc','','','Action','','',NULL,'dbGUI.html');
INSERT INTO Games VALUES('Hkyi9Q7Q-','abc','','','Action','','',NULL,'dbGUI.html');
INSERT INTO Games VALUES('ryYAqXXQZ','abcdas','','','Action','','',NULL,'dbGUI.html');
INSERT INTO Games VALUES('S1Kbj7m7W','abasdg','','','Action','','','asdgasgd','dbGUI.html');
INSERT INTO Games VALUES('HJ7GsX77b','abasdg','','','Action','','',replace('asdgasgd asdgasdg sadg\n\nasdgasg','\n',char(10)),'dbGUI.html');
INSERT INTO Games VALUES('HJ8wyNmXW','abc123','asdgas','','Action','','','asgasdgasg','dbGUI.html');
INSERT INTO Games VALUES('HkY4BGEX-','A new Game','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('Syd2SMEQ-','','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('Bkff8f47-','abcd','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('HJ5V8GVXZ','1252','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('BJvLIfVQZ','241242','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('Bki9LMNmb','','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('SkWXPMV7W','123','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('BkxTvfVQb','1242','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('Hy9euz4QZ','abc','','','Action','','','','41699326_p0.jpg');
INSERT INTO Games VALUES('ry3K_GVQb','abc','','','Action','','','','41379423_p0.png');
INSERT INTO Games VALUES('ByEe8HE7W','Full Game','Someone','Person','RPG',51.999999999999999998,'2001-05-16','This a test for a game with all fields completed','Assets/Images/53188622_p0.jpg');
INSERT INTO Games VALUES('Bk2BsrNQ-','Gam2','asdgas','asdgasgd','RPG',140.99999999999999999,'1992-02-06',replace('Some random\nInformation','\n',char(10)),'Assets/Images/41699326_p0.jpg');
CREATE TABLE User(
   EMAIL          CHAR(64)    PRIMARY KEY     NOT NULL,
   PASSWORD       TEXT    NOT NULL,
   STATUS         TEXT     NOT NULL,
   PICTURE        CHAR(50) DEFAULT 'assets/profile/default.png'
, username char(64));
INSERT INTO User VALUES('someEmail','password','user','assets/profile/default.png',NULL);
INSERT INTO User VALUES('anotherEmail','password','user','assets/profile/default.png',NULL);
INSERT INTO User VALUES('abc','123','ADMIN','assets/profile/default.png',NULL);
INSERT INTO User VALUES('','','ADMIN','assets/profile/default.png',NULL);
INSERT INTO User VALUES('abcd','123','ADMIN','assets/profile/default.png',NULL);
INSERT INTO User VALUES('abc32','123','ADMIN','assets/profile/default.png',NULL);
CREATE TABLE Friends(
    user char(64),
    friend char(64),
    status char(64),
    PRIMARY KEY(user,friend)
    FOREIGN KEY(user) REFERENCES User(EMAIL)
    FOREIGN KEY(friend) REFERENCES User(EMAIL)
);
CREATE TABLE Likes(
    userID CHAR(64),
    gameID CHAR(64), 
    timestamp DATETIME,
    PRIMARY KEY(userID,gameID),
    FOREIGN KEY(userID) REFERENCES User(EMAIL),
    FOREIGN KEY(gameID) REFERENCES Games(GameID)
);
CREATE TABLE Review(
    userID CHAR(64),FOREIGN KEY(userID) REFERENCES User(EMAIL),
    gameID CHAR(64),FOREIGN KEY(gameID) REFERENCES Games(GameID),
    review_text TEXT,   
    time_stamp DATE,
    rating DOUBLE,
    PRIMARY KEY(userID,gameID)
);
COMMIT;
