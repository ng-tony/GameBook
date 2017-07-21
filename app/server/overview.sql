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
CREATE TABLE IF NOT EXISTS "User" (
	`EMAIL`	CHAR(64) NOT NULL,
	`PASSWORD`	TEXT NOT NULL,
	`STATUS`	TEXT NOT NULL,
	`PICTURE`	CHAR(50) DEFAULT 'assets/profile/default.png',
	`username`	char(64),
	`DESCRIPTION`	TEXT,
	PRIMARY KEY(`EMAIL`)
);
INSERT INTO User VALUES('someEmail','password','user','Assets/profile/default.png',NULL,NULL);
INSERT INTO User VALUES('anotherEmail','password','user','Assets/profile/default.png',NULL,NULL);
INSERT INTO User VALUES('abc','123','ADMIN','Assets/profile/default.png',NULL,NULL);
INSERT INTO User VALUES('','','ADMIN','Assets/profile/default.png',NULL,NULL);
INSERT INTO User VALUES('abcd','123','ADMIN','Assets/profile/default.png',NULL,NULL);
INSERT INTO User VALUES('abc32','123','ADMIN','Assets/profile/default.png',NULL,NULL);
INSERT INTO User VALUES('abc@gmail.com','123','ADMIN','Assets/profile/default.png','USER',NULL);
INSERT INTO User VALUES('testMail@gmail.com','test','user','57171771_p0.jpg','Robert',replace('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed ligula imperdiet, lacinia arcu dictum, rutrum tellus.\n                    In mollis nec metus nec malesuada. Nunc eleifend, risus vel ultrices ullamcorper, massa massa sollicitudin\n                    lorem, id dictum risus diam sit amet eros. Mauris tincidunt ut sem sed rutrum. Sed convallis, nunc non\n                    hendrerit faucibus, orci metus placerat urna, eget tincidunt arcu arcu ut dui. Duis et purus malesuada,\n                    egestas justo vitae, aliquet dolor. Proin pharetra tellus ultricies nisl sollicitudin convallis. Duis\n                    a diam metus. Vivamus venenatis luctus leo, in feugiat lorem consectetur non. Vivamus sit amet felis\n                    semper, pulvinar quam vel, porta odio. Pellentesque tincidunt lectus non tempor posuere. Duis at sem\n                    in lectus porta iaculis.','\n',char(10)));
CREATE VIEW total_likes as 
    select games.gameID, count(*) as x from likes join games on games.gameID = likes.gameID
        group by games.gameID
        order by x DESC;
CREATE VIEW popularity as
select gameID, x, (select count(*) from total_likes b  where a.x <= b.x) as ranking
from total_likes a;
CREATE VIEW Ratings AS select games.gameID as ID,round(avg(rating),1) as rating from games join review on games.gameID = review.gameID 
    group by games.gameID
    order by rating DESC;
COMMIT;
