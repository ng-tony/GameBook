CREATE TABLE IF NOT EXISTS "Friends" (
	`user`	char(64) REFERENCES `User`(`EMAIL`) ON UPDATE CASCADE,
	`friend`	char(64) REFERENCES `User`(`EMAIL`) ON UPDATE CASCADE,
	`status`	char(64),
	PRIMARY KEY(`user`,`friend`)
);
INSERT INTO Friends VALUES('abc@gmail.com','abc','Accepted');
INSERT INTO Friends VALUES('abc','abc@gmail.com','Accepted');
INSERT INTO Friends VALUES('test1','abc','Accepted');
INSERT INTO Friends VALUES('abc','test1','Accepted');