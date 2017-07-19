new Vue({
	el: "#topRatedGamesList",
	data: {
		topRatedGames: {},
		test: "something",
		loading: true,
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

new Vue({
	el: "#articles",
	data: {
		loading: true,
		articles: {}
	},
	created() {
			console.log(this.loading);
			var self = this
		
			axios.get('https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=1e641b65aa15478fb01b525d1d5d3063')
				.then(function (response) {
					console.log(response);
					self.articles = response.data.articles;
					console.log(self.articles[0]);
					for (var i =0; i < self.articles.length; i++){
						var article = self.articles[i];
						article.title = article.title.substring(0, article.title.length - 6);
					}
				})
				.catch(function (err) {
					console.log("error")
					console.log(err);
				})
			console.log(this.loading);
		}
})

new Vue({
	el: "#latestGames",
	data: {
		loading: true,
		latestGames: {}
	},
	created() {
			console.log(this.loading);
			var self = this
			axios.get('http://localhost:8081/games/recent?limit=3')
				.then(function (response) {
					console.log("hello");
					self.loading = false;
					self.latestGames = response.data
					for(var i = 0; i < self.latestGames.length; i++){
						console.log(self.latestGames[i]);
						self.latestGames[i].href = "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid="
						+ self.latestGames[i].GameID;
					}
					self.loading = false;
					console.log(self.latestGames[0].href);
				})
				.catch(function (err) {
					console.log("error")
					console.log(err);
				})
			console.log(this.loading);
		}
})

new Vue({
	el: "#latestReviews",
	data: {
		loading: true,
		latestGames: {}
	},
	created() {
			console.log(this.loading);
			var self = this
			axios.get('http://localhost:8081/games/recent/review?limit=3')
				.then(function (response) {
					console.log("hello");
					self.loading = false;
					self.latestGames = response.data
					for(var i = 0; i < self.latestGames.length; i++){
						console.log(self.latestGames[i]);
						self.latestGames[i].href = "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid="
						+ self.latestGames[i].GameID;
					}
					self.loading = false;
					console.log(self.latestGames[0].href);
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