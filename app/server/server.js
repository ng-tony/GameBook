var express = require("express");
var app = express();
var path = require("path");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("GameBook.db");
var shortid = require("shortid");
var _ = require("lodash");
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
app.post("/addMessage", function(req, res) {
  const addMessage = "INSERT or REPLACE into Messages values(?,?,?,?)";
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
      parsed.recipient.trim(),
      parsed.sender.trim(),
      parsed.message.trim(),
      parsed.date.trim()
    ];
    console.log(params);
    db.run(addMessage, params);
    res.end();
  });
});
app.post("/like", function(req, res) {
  const addReview = "INSERT into likes values(?,?,?)";
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
    var params = [parsed.user.trim(), parsed.game.trim(), parsed.date.trim()];
    console.log(params);
    db.run(addReview, params);
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
  var selectSQL =
    "Select * from review join user on review.userID = user.email where gameID=? COLLATE NOCASE";
  db.all(selectSQL, id, function(err, rows) {
    res.send(rows);
  });
});
app.get("/recommend", function(req, res) {
  console.log("a get request");
  var user = req.query.email;
  console.log(user);
  var selectSQL =
    "Select * from review join user on  review.userID = user.email join games on review.gameID = games.GameID where userID = ?";
  db.all(selectSQL, user, function(err, rows) {
    var recGames = [];
    rows = _.orderBy(rows, ["rating"], ["desc"]);
    if (rows.length >= 3) {
      var refGames = [rows[0], rows[1], rows[2]];
      db.all("Select GameID,title,genre,Developer,PICTURE from games", function(
        err,
        gameRows
      ) {
        console.log("IM HERE", refGames[1]);
        for (i = 0; i < 3; i++) {
          var list = _.filter(gameRows, function(game) {
            return (
              game.Genre == refGames[i].Genre &&
              game.GameID != refGames[i].GameID
            );
          });
          console.log("LIST", list);
          recGames = recGames.concat(list);
          console.log("REC", recGames);
        }
        console.log("GAMES RECOMMENDED", recGames);
        res.send(recGames);
      });
    } else {
      res.send(false);
    }
  });
});
app.get("/search", function(req, res) {
  console.log("a get request");
  var title = req.query.title;
  console.log(title);
  var selectSQL =
    "Select * from Games where title LIKE" +
    "'%" +
    title +
    "%'" +
    "COLLATE NOCASE";
  console.log(selectSQL);
  db.all(selectSQL, function(err, rows) {
    res.send(rows);
  });
});
app.delete("/dislike", function(req, res) {
  console.log("a delete request");
  var title = req.query.title;
  var email = req.query.email;
  var deleteSQL = "delete from likes where gameID = ? and userID = ?";
  console.log(title);
  console.log(email);
  var params = [title, email];
  db.run(deleteSQL, params);
  res.send("done");
});
app.get("/userLike", function(req, res) {
  console.log("a get request");
  var user = req.query.email;
  var title = req.query.title;
  console.log(user);
  var selectSQL = "Select * from Likes where userID = ? and gameID = ?";
  var params = [user, title];
  db.all(selectSQL, params, function(err, rows) {
    if (rows.length == 0) {
      res.send("false");
    } else {
      res.send("true");
    }
  });
});

app.get("/adv_search", function(req, res) {
  console.log("advanced search request");
  var data = JSON.parse(decodeURIComponent(req.query.search));
  const selectSQL =
    "Select * from Games left join Ratings on Games.gameID = Ratings.ID ";
  db.all(selectSQL, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      if (rows[i].rating == null) {
        rows[i].rating = 0;
      }
    }
    if (data.name != "") {
      _.remove(rows, function(o) {
        return o.Publisher != data.name && o.Developer != data.name;
      });
    }
    if (data.genre != "") {
      const genres = data.genre.split(",");
      _.remove(rows, function(o) {
        return !genres.includes(o.Genre);
      });
    }
    if (data.rating != "") {
      const rating = parseInt(data.rating);
      _.remove(rows, function(o) {
        return o.rating < rating;
      });
    }
    if (data.beforeDate != "") {
      console.log(data.beforeDate);
      const date = new Date(data.beforeDate);
      _.remove(rows, function(o) {
        const compareDate = new Date(o.RELEASE_DATE);
        return compareDate > date;
      });
    }
    if (data.afterDate != "") {
      const date = new Date(data.beforeDate);
      _.remove(rows, function(o) {
        const compareDate = new Date(o.RELEASE_DATE);
        return compareDate < date;
      });
    }
    if (data.sort != "") {
      console.log(data.sort);
      var sorted = [];
      if (data.sort == "Alphabetical") {
        rows = _.orderBy(rows, [row => row.Title.toLowerCase()], ["asc"]);
      }
      if (data.sort == "Rating") {
        rows = _.orderBy(rows, ["rating"], ["desc"]);
      }
      console.log(rows);
    }

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

function updateSQL(attr) {
  return "UPDATE User SET " + attr + " = ?" + " WHERE EMAIL = ?";
}

app.put("/updateUser", function(req, res) {
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
    console.log(parsed);
    console.log(updateSQL("EMAIL", parsed.email));
    var update = {
      PASSWORD: parsed.password,
      PICTURE: parsed.picture,
      DESCRIPTION: parsed.desc,
      username: parsed.username,
      EMAIL: parsed.email
    };
    for (var key in update) {
      if (update.hasOwnProperty(key)) {
        if (update[key] != "") {
          console.log(key, "->", update[key]);
          db.run(updateSQL(key), [update[key], parsed.user]);
        }
      }
    }
    if (parsed.email == "") {
      console.log("EMAIL NOT CHANGED");
      console.log(parsed.user);
      res.end(JSON.stringify(parsed.user));
    } else {
      res.end(JSON.stringify(parsed.email));
    }
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
app.get("/userinfo", function(req, res) {
  console.log("get userinfo");
  var email = req.query.email;
  console.log(email);
  var selectSQL =
    "select EMAIL, DESCRIPTION, PICTURE, username from User where email=?";
  db.all(selectSQL, email, function(err, rows) {
    res.send(rows);
  });
});
app.get("/user_reviews", function(req, res) {
  console.log("get userreviews");
  var email = req.query.email;
  console.log(email);
  var selectSQL =
    "Select * from review join games on games.GameID = review.gameID where review.userID = ?";
  db.all(selectSQL, email, function(err, rows) {
    console.log(rows);
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
  var selectSQL =
    "select PICTURE,friend,email,friends.status from Friends join User on Friends.friend = User.email where user = ?";
  db.all(selectSQL, user, function(err, rows) {
    console.log("THE ROWS: ", rows);
    res.send(rows);
  });
});
app.get("/getMessagesTo", function(req, res) {
  var user = req.query.user;
  console.log(user);
  var selectSQL = "select * from Messages where recipient = ?";
  db.all(selectSQL, user, function(err, rows) {
    console.log("THE ROWS: ", rows);
    res.send(rows);
  });
});
app.get("/getMessagesFrom", function(req, res) {
  var user = req.query.user;
  console.log(user);
  var selectSQL = "select * from Messages where sender = ?";
  db.all(selectSQL, user, function(err, rows) {
    console.log("THE ROWS: ", rows);
    res.send(rows);
  });
});

app.get("/games/top/rating", function(req, res) {
  console.log("getting top games");
  var limit = req.query.limit;
  var selectSQL =
    "select * from games join Ratings on games.GameID = Ratings.ID order by rating desc limit ?";
  db.all(selectSQL, limit, function(err, rows) {
    res.send(rows);
  });
});

app.get("/games/top/likes", function(req, res) {
  console.log("getting top games");
  var limit = req.query.limit;
  var selectSQL =
    "select * from games join total_likes on games.gameID = total_likes.gameID limit ?";
  db.all(selectSQL, limit, function(err, rows) {
    res.send(rows);
  });
});

app.get("/games/recent", function(req, res) {
  console.log("getting recent games");
  var limit = req.query.limit;
  var selectSQL = "select * from games order by RELEASE_DATE DESC limit ?";
  db.all(selectSQL, limit, function(err, rows) {
    res.send(rows);
  });
});

app.get("/games/recent/review", function(req, res) {
  console.log("getting recent reveiwed games");
  var limit = req.query.limit;
  var selectSQL =
    "select * from games join Review on games.gameid = review.gameid order by time_stamp DESC limit ?";
  db.all(selectSQL, limit, function(err, rows) {
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
            var response = requestFromProfile(params[1], params[0]);
            res.end(JSON.stringify(response));
          }
        });
      }
    });
  });
});

app.post("/accept_friend", function(req, res) {
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
    acceptFriendRequest(parsed.currUser, parsed.friend);
    res.end();
  });
});
app.post("/reject_friend", function(req, res) {
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
    declineFriendRequest(parsed.currUser, parsed.friend);
    res.end();
  });
});

app.post("/mutual_friends", function(req, res) {
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
    var intersectSQL =
      "Select friend from Friends where user=? and status='Accepted' intersect Select friend from Friends where user=? and status='Accepted'";
    db.all(intersectSQL, parsed.currUser, parsed.otherUser, function(
      err,
      rows
    ) {
      res.send(rows);
    });
  });
});

// add a user as a friend from that friend's profile
function requestFromProfile(currentUser, friend) {
  var params = [currentUser, friend.trim()];
  var insertSQL =
    "Insert into Friends (user, friend, status) values (?,?,'Pending')";
  db.run(insertSQL, params);
  return "requested";
}

function removeFriend(currentUser, friend) {
  var params = [currentUser, friend.trim()];
  var deleteSQL = "Delete from Friends where user=? and friend=?";
  db.run(deleteSQL, params);
  params = [friend.trim(), currentUser];
  db.run(deleteSQL, params);
}

function acceptFriendRequest(currentUser, friend) {
  var params = [friend.trim(), currentUser];
  console.log("PARAMETERS: ", params);
  var updateSQL =
    "Update Friends set status='Accepted' where user=? and friend=?";
  var insertSQL = "Insert into Friends values(?,?,'Accepted')";
  var new_params = [currentUser, friend.trim()];
  console.log("NEW PARAMS:", new_params);
  db.run(insertSQL, params);
  db.run(updateSQL, new_params);
}

function declineFriendRequest(currentUser, friend) {
  var params = [currentUser.trim(), friend.trim()];
  var deleteSQL =
    "Delete from Friends where user=? and friend=? and status='Pending'";
  db.run(deleteSQL, params);
  response = "Declined friend request from" + friend.trim();
  return response;
}

function getFriends(currentUser) {
  var selectSQL =
    "Select friend from Friends where user=? and status='Accepted'";
  db.all(selectSQL, currentUser.trim(), function(err, rows) {
    //res.send(rows);
  });
}

function getPendingFriends(currentUser) {
  var selectSQL =
    "Select friend from Friends where user=? and status='Pending'";
  db.all(selectSQL, currentUser.trim(), function(err, rows) {
    //res.send(rows);
  });
}
