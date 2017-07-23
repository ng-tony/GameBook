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