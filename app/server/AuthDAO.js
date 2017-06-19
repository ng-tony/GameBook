class AuthDAO {

	constructor(database) {
		var sqlite3 = require('sqlite3').verbose();
		this.db = new sqlite3.Database(database);

	}
	signUp(username,password) {
		var SQLcount = 'Select COUNT(*) as count from (Select EMAIL from User where EMAIL="' + username + '")';
		var rowCount;

		this.db.all(SQLcount, function (err, rows) {
			var count = rows[0].count;
			return count;
    	});
    	if (rowCount == 0) {
    		var insertSQL = 'INSERT into User(EMAIL,PASSWORD,STATUS) VALUES("' + username + '","' + password + '","user")';
			this.db.run(insertSQL);
			console.log("Succesfully signed up");
    	}
    	else {
    		console.log("This username already exists");
    	}
	}
	signIn(username, password) {
		var selectSQL = 'Select COUNT(*) as count from (Select * from User where EMAIL="' + username + '"and PASSWORD="' + password + '")';
		console.log(selectSQL);
		this.db.all(selectSQL, function(err, rows) {
			console.log(rows[0].count)
			if (rows[0].count == 0) {
				console.log("Username or password is incorrect");
			}
			else {
				console.log("Succesfully signed in");
			}
		});
	}
}
