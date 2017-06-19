var express = require("express");
var app = express();
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("GameBook.db");
var shortid = require("shortid");
var insertSQL =
  "INSERT OR REPLACE INTO Games(GAMEID,TITLE,PUBLISHER,DEVELOPER,GENRE,PRICE,RELEASE_DATE,DESCRIPTION,PICTURE)" +
  "VALUES(?,?,?,?,?,?,?,?,?)";
app.post("/dbGUI", function(req, res) {
  var data = " ";
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", function() {
    console.log("POST data received");
    res.writeHead(200, {
      "Content-Type": "text/json"
    });
    var parsed = JSON.parse(data);
    console.log(parsed.content.length);
    var params = [
      shortid.generate(),
      parsed.title.trim(),
      parsed.publisher.trim(),
      parsed.developer.trim(),
      parsed.genre.trim(),
      parsed.price,
      parsed.release_date,
      parsed.description,
      "Assets/Images/" + parsed.picture
    ];
    console.log("Assets/Images/" + parsed.picture);
    db.run(insertSQL, params);
    res.end();
  });
});
app.get("/search", function(req, res) {
  console.log("a get request");
  var title = req.query.title;
  console.log(title);
  var selectSQL = "Select * from Games where title=? COLLATE NOCASE";
  db.all("Select * from Games where title=?", title, function(err, rows) {
    res.send(rows);
  });
});

app.post("/signin", function(req, res) {
  var data = " ";
  req.on("data", function(chunk) {
    data += chunk;
  });
  console.log(data);
  req.on("end", function() {
    console.log("POST data received");
    res.writeHead(200, {
      "Content-Type": "text/json"
    });
    var parsed = JSON.parse(data);
    var params = [parsed.username.trim(), parsed.password.trim()];
    var selectSQL =
      "Select COUNT(*) as count from (Select * from User where EMAIL=? and PASSWORD=?)";
    var loggedIn = true;
    db.all(selectSQL, params, function(err, rows) {
      console.log(rows[0].count);
      if (rows[0].count == 0) {
        loggedIn = false;
        console.log("Username or password is incorrect");
      } else {
        console.log("Succesfully signed in");
      }
      res.end(JSON.stringify(loggedIn));
    });
  });
});

app.post("/register", function(req, res) {
  var data = " ";
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", function() {
    console.log("POST data received");
    res.writeHead(200, {
      "Content-Type": "text/json"
    });
    var parsed = JSON.parse(data);
    var params = [parsed.username.trim(), parsed.password.trim()];
    var selectSQL = "Select email from user where email = ?";
    var response = "";
    db.all(selectSQL, params[0], function(err, rows) {
      if (rows.length != 0) {
        response = "IN_USE";
      } else {
        db.run(
          "Insert into USER (EMAIL,PASSWORD,STATUS) VALUES (?,?,'ADMIN')",
          params
        );
        response = "ADDED";
      }
      res.end(JSON.stringify(response));
    });
  });
});
app.get("/gameinfo", function(req, res) {
  console.log("get gameinfo");
  var gameid = req.query.gameid;
  console.log(gameid);
  var selectSQL = "Select * from Games where gameid=? COLLATE NOCASE";
  db.all("Select * from Games where gameid=?", gameid, function(err, rows) {
    res.send(rows);
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
