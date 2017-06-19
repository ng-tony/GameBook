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

app.get("/signin", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});


app.post("/signin", function(req, res) {
  var data = " ";
  req.on("data", function(chunk) {
    data += chunk;
  });
  console.log(data)
  req.on("end", function() {
    console.log("POST data received");
    res.writeHead(200, {
      "Content-Type": "text/json"
    });
    var parsed = JSON.parse(data);
    console.log(parsed.content.length);
    var params = [
      shortid.generate(),
      parsed.username.trim(),
      parsed.password.trim()
    ];
    var selectSQL = 'Select COUNT(*) as count from (Select * from User where EMAIL="' + username + '"and PASSWORD="' + password + '")';
    this.db.all(selectSQL, function(err, rows) {
      console.log(rows[0].count)
      if (rows[0].count == 0) {
        console.log("Username or password is incorrect");
      }
      else {
        console.log("Succesfully signed in");
      }
    });
    res.end();
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
