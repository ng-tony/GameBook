new Vue({
	el: "#topRatedGamesList",
	data: {
		topRatedGames: {},
		test: "something",
		loading: true
	},
	created() {
			console.log(this.loading);
			var self = this
			axios.get('http://localhost:8081/games/top/likes?limit=3')
				.then(function (response) {
					console.log("hello");
					self.loading = false;
					self.topRatedGames = response.data
					for(var i = 0; i < self.topRatedGames.length; i++){
						console.log(self.topRatedGames[i]);
						self.topRatedGames[i].href = "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid="
						+ self.topRatedGames[i].GameID;
					}
					self.loading = false;
					console.log(self.topRatedGames[0].href);
				})
				.catch(function (err) {
					console.log("error")
					console.log(err);
				})
			console.log(this.loading);
		}
})



/* JQUERY TEST QUERY
$(document).ready(function(){
console.log("TEST");
let topRatedBackEnd = "http://localhost:8081/games/top?limit=3";
let gameProfileUrl = "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid=";
$.ajax({
	type: "GET",
	url: topRatedBackEnd
}).done(function(data){
		console.log("finish");
		console.log(data);
}).fail(function(data){
		console.log("fail");
		console.log(data);
});
})
*/