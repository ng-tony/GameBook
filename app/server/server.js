var express = require("express");
var app = express();
var path = require("path");
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
app.post("/addReview", function(req, res) {
  const addReview = "INSERT or REPLACE into review values(?,?,?,?,?)";
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
    var params = [
      parsed.user.trim(),
      parsed.game.trim(),
      parsed.text.trim(),
      parsed.date.trim(),
      parsed.rating
    ];
    console.log(params);
    db.run(addReview, params);
    res.end();
  });
});
app.get("/listReviews", function(req, res) {
  console.log("a get request");
  var id = req.query.gameid;
  console.log(id);
  var selectSQL = "Select * from review where gameID=? COLLATE NOCASE";
  db.all(selectSQL, id, function(err, rows) {
    res.send(rows);
  });
});
app.get("/search", function(req, res) {
  console.log("a get request");
  var title = req.query.title;
  console.log(title);
  var selectSQL = "Select * from Games where title=? COLLATE NOCASE";
  db.all("Select * from Games where title=? COLLATE NOCASE", title, function(
    err,
    rows
  ) {
    res.send(rows);
  });
});

app.get("", function(req, res) {
  console.log("a get request");
  var title = "ok";
  console.log(title);
  res.sendFile(path.join(__dirname + "/../web_pages/main_page.html"));
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
  var selectSQL =
    "Select * from Games left join Ratings on Games.gameID = Ratings.ID where gameid=? COLLATE NOCASE";
  db.all(selectSQL, gameid, function(err, rows) {
    res.send(rows);
  });
});
app.get("/search_user", function(req, res) {
  var user = req.query.user;
  console.log(user);
  var selectSQL = "select email from User where email = ?";
  db.all(selectSQL, user, function(err, rows) {
    if (rows.length == 0) {
      console.log("not found");
      res.send(false);
    } else {
      console.log("found");
      res.send(true);
    }
  });
});
app.get("/getFriends", function(req, res) {
  var user = req.query.user;
  console.log(user);
  var selectSQL = "select * from Friends where user = ?";
  db.all(selectSQL, user, function(err, rows) {
    console.log(rows);
    res.send(rows);
  });
});

app.get("/games/top/rating", function(req, res) {
	console.log("getting top games");
	var limit = req.query.limit;
	var selectSQL = 'select * from games join Ratings on games.GameID = Ratings.ID order by rating desc limit ?';
	db.all(selectSQL, limit, function(err, rows){
		res.send(rows);
	});
});

app.get("/games/top/likes", function(req, res) {
	console.log("getting top games");
	var limit = req.query.limit;
	var selectSQL = "select * from games join total_likes on games.gameID = total_likes.gameID limit ?";
	db.all(selectSQL, limit, function(err, rows){
		res.send(rows);
	});
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.post("/add_friend", function(req, res) {
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
    var params = [parsed.currUser.trim(), parsed.friend.trim()];
    // check if user exists
    var selectSQL = "Select email from User where email=?";
    db.all(selectSQL, params[0], function(err, rows) {
      if (rows.length == 0) {
        var response = "User does not exist";
        res.end(JSON.stringify(response));
      } else {
        // check if friendship already exists
        selectSQL = "Select * from Friends where user=? and friend=?";
        db.all(selectSQL, params, function(err, rows) {
          if (rows.length > 0) {
            rows.forEach(function(row) {
              console.log(status);
              var status = row.status;
              if (status == "Pending") {
                var response = "Friend request awaiting approval.";
                res.end(JSON.stringify(response));
              }
              if (status == "Accepted") {
                var response = "Already friends.";
                res.end(JSON.stringify(response));
              }
            });
          } else {
            // add friend to database with "pending" status
            var response = requestFromProfile(params[0], params[1]);
            res.end(JSON.stringify(response));
          }
        });
      }
    });
  });
});

// add a user as a friend from that friend's profile
function requestFromProfile(currentUser, friend) {
  var params = [currentUser, friend.trim()];
  var insertSQL =
    "Insert into Friends (user, friend, status) values (?,?,'Pending')";
  db.run(insertSQL, params);
  var response = "Friend request sent to " + friend;
  return response;
}

function removeFriend(currentUser, friend) {
  var params = [currentUser, friend.trim()];
  var deleteSQL = "Delete from Friends where user=? and friend=?";
  db.run(deleteSQL, params);
  params = [friend.trim(), currentUser];
  db.run(deleteSQL, params);
  var response = friend + " is no longer your friend.";
  return response;
}

function acceptFriendRequest(currentUser, friend) {
  var params = [friend.trim(), currentUser];
  var updateSQL =
    "Update Friends set status='Accepted' where user=? and friend=?";
  db.run(updateSQL, params);
  params = [currentUser, friend.trim()];
  var insertSQL =
    "Insert into Friends (user, friend, status) values (?,?,'Accepted')";
  db.run(insertSQL, params);
  var response = user + " is now your friend.";
  return response;
}

function declineFriendRequest(currentUser, friend) {
  var params = [currentUser.trim(), friend.trim()];
  var deleteSQL = "Delete from Friends where user=? and friend=? and status='Pending'";
  db.run(deleteSQL, params);
  response = "Declined friend request from" + friend.trim();
  return response;
}

function getFriends(currentUser) {
  var selectSQL = "Select friend from Friends where user=? and status='Accepted'";
  db.all(selectSQL, currentUser.trim(), function(err, rows) {
    //res.send(rows);
  }); 
}

function getPendingFriends(currentUser) {
  var selectSQL = "Select friend from Friends where user=? and status='Pending'";
  db.all(selectSQL, currentUser.trim(), function(err, rows) {
    //res.send(rows);
  });
}
