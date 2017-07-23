PRAGMA foreign_keys=on;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
	`EMAIL`	CHAR(64) NOT NULL,
	`PASSWORD`	TEXT NOT NULL,
	`STATUS`	TEXT NOT NULL,
	`PICTURE`	CHAR(50) DEFAULT 'assets/profile/default.png',
	`username`	char(64),
	`DESCRIPTION`	TEXT,
	PRIMARY KEY(`EMAIL`)
);
INSERT INTO User VALUES('someEmail','password','user','default.png',NULL,NULL);
INSERT INTO User VALUES('anotherEmail','password','user','default.png',NULL,NULL);
INSERT INTO User VALUES('abc','123','ADMIN','default.png','Tonyyyy','"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"');
INSERT INTO User VALUES('','','ADMIN','default.png',NULL,NULL);
INSERT INTO User VALUES('abcd','123','ADMIN','default.png',NULL,NULL);
INSERT INTO User VALUES('abc32','123','ADMIN','default.png',NULL,NULL);
INSERT INTO User VALUES('abc@gmail.com','123','ADMIN','default.png','USER',NULL);
INSERT INTO User VALUES('test','test','user','jonathan-lam-floating-island-72dpi.jpg','Bob Smith',replace('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed ligula imperdiet, lacinia arcu dictum, rutrum tellus.\n                    In mollis nec metus nec malesuada. Nunc eleifend, risus vel ultrices ullamcorper, massa massa sollicitudin\n                    lorem, id dictum risus diam sit amet eros. Mauris tincidunt ut sem sed rutrum. Sed convallis, nunc non\n                    hendrerit faucibus, orci metus placerat urna, eget tincidunt arcu arcu ut dui. Duis et purus malesuada,\n                    egestas justo vitae, aliquet dolor. Proin pharetra tellus ultricies nisl sollicitudin convallis. Duis\n                    a diam metus. Vivamus venenatis luctus leo, in feugiat lorem consectetur non. Vivamus sit amet felis\n                    semper, pulvinar quam vel, porta odio. Pellentesque tincidunt lectus non tempor posuere. Duis at sem\n                    in lectus porta iaculis.','\n',char(10)));
CREATE TABLE Likes(
    userID CHAR(64) REFERENCES User(EMAIL) ON UPDATE CASCADE,
    gameID CHAR(64) REFERENCES Games(GameID) ON UPDATE CASCADE, 
    timestamp DATETIME,
    PRIMARY KEY(userID,gameID)
);
INSERT INTO Likes VALUES('abc','Bk2BsrNQ-','2017-03-20 05:45:20');
INSERT INTO Likes VALUES('abc32','Bk2BsrNQ-','2017-03-20 07:45:20');
INSERT INTO Likes VALUES('abc@gmail.com','Bk2BsrNQ-','2017-03-20 09:45:20');
INSERT INTO Likes VALUES('abc','ByEe8HE7W','2017-03-20 05:45:20');
INSERT INTO Likes VALUES('abc32','ByEe8HE7W','2017-03-20 07:45:20');
INSERT INTO Likes VALUES('abc@gmail.com','ByEe8HE7W','2017-03-20 09:45:20');
INSERT INTO Likes VALUES('abcd','ByEe8HE7W','2017-03-20 05:45:20');
CREATE TABLE Review(
    userID CHAR(64) REFERENCES User(EMAIL) ON UPDATE CASCADE,
    gameID CHAR(64) REFERENCES Games(GameID) ON UPDATE CASCADE,
    review_text TEXT,   
    time_stamp DATE,
    rating DOUBLE,
    PRIMARY KEY(userID,gameID)
);
INSERT INTO Review VALUES('abc32','ByEe8HE7W','a new review made by me','2017-07-02 06:50:50',8.0);
INSERT INTO Review VALUES('abc@gmail.com','ByEe8HE7W','A new Review','7/3/2017 13:51:33',3.0);
INSERT INTO Review VALUES('test','SkWXPMV7W','a new review made by me','2017-07-02 06:50:50',2.0);
INSERT INTO Review VALUES('test','ByEe8HE7W','and again','7/2/2017 22:55:37',5.0);
INSERT INTO Review VALUES('test','Bk2BsrNQ-','a new review to see if review gets updated','7/3/2017 15:51:42',6.0);
CREATE TABLE IF NOT EXISTS "Friends" (
	`user`	char(64) REFERENCES `User`(`EMAIL`) ON UPDATE CASCADE,
	`friend`	char(64) REFERENCES `User`(`EMAIL`) ON UPDATE CASCADE,
	`status`	char(64),
	PRIMARY KEY(`user`,`friend`)
);
INSERT INTO Friends VALUES('abc@gmail.com','abc','Accepted');
INSERT INTO Friends VALUES('abc','abc@gmail.com','Accepted');
INSERT INTO Friends VALUES('test','abc','Accepted');
INSERT INTO Friends VALUES('abc','test','Accepted');
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
CREATE VIEW total_likes as 
    select games.gameID, count(*) as x from likes join games on games.gameID = likes.gameID
        group by games.gameID
        order by x DESC;
CREATE VIEW popularity as
select gameID, x, (select count(*) from total_likes b  where a.x <= b.x) as ranking
from total_likes a;
CREATE VIEW Ratings AS select games.gameID as ID,round(avg(rating),1) as rating from games join review on games.gameID = review.gameID 
    group by games.gameID
    order by rating DESC;0
MMIT;
