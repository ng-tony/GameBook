new Vue({
  el: "#topRatedGamesList",
  data: {
    topRatedGames: {},
    test: "something",
    loading: true
  },
  created() {
    console.log(this.loading);
    var self = this;
    axios
      .get("http://localhost:8081/games/top/likes?limit=3")
      .then(function(response) {
        console.log("hello");
        self.loading = false;
        self.topRatedGames = response.data;
        for (var i = 0; i < self.topRatedGames.length; i++) {
          console.log(self.topRatedGames[i]);
          self.topRatedGames[i].href =
            "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid=" +
            self.topRatedGames[i].GameID;
        }
        self.loading = false;
        console.log(self.topRatedGames[0].href);
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
    console.log(this.loading);
  }
});

Vue.component("rec-card", {
  props: ["Title", "Dev", "Picture", "ID"],
  data() {
    return {
      imageURL: this.Picture,
      URL: "game_profile.html#/?gameid=" + this.ID
    };
  },
  created() {
    console.log("URL", this.imageURL);
  },
  template: `
			<div class="card recommend">
				<img class="card-img-top" :src="imageURL" height="300 " alt="Card image cap ">
        <div class="card-block ">
          <a :href = "URL"><h4 class="card-title">{{Title}}</h4></a>
					<p class="card-text ">{{Dev}}</p>
				</div>
			</div> `
});
Vue.component("rec-list", {
  props: ["game"],
  created() {
    console.log("LIST PROPERTY", this.game);
  },
  template: `
      <div class="row">
        <rec-card v-for = "g in game" :ID = "g.GameID" :Picture = "g.PICTURE" :Title = "g.Title" :Dev = "g.Developer"></rec-card>
			</div> `
});
Vue.component("rec-slide", {
  data() {
    return {
      games: [],
      splitGames: [],
      activeGames: [],
      expand: false
    };
  },

  created() {
    if (sessionStorage.getItem("signedIn") == "true") {
      var self = this;
      axios
        .get(
          "http://localhost:8081/recommend?email=" +
            sessionStorage.getItem("username")
        )
        .then(function(response) {
          self.games = response.data;
          const size = 3;
          while (self.games.length > 0) {
            self.splitGames.push(self.games.splice(0, size));
          }
          self.activeGames.push(self.splitGames[0]);
          console.log("ACTIVE GAMES", self.activeGames[0]);
          self.splitGames.splice(0, 1);
          self.expand = self.splitGames.length > 1;
        })
        .catch(function(err) {
          console.log("error");
        });
    }
  },
  template: `
  <div id="rec-carousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
        <rec-list :game = "activeGames[0]"></rec-list>
      </div>
      <div class="carousel-item" v-for = "game in splitGames">
          <rec-list :game = "game"></rec-list>
      </div>
    </div>
    <a class="carousel-control-next" href="#rec-carousel" role="button" data-slide="next">
      <span style = "margin-bottom:100px" class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>

  </div>
  `
});

new Vue({
  el: "#rec-list",
  data: {
    signedIn: false
  },
  created() {
    this.signedIn = sessionStorage.getItem("signedIn") == "true";
  }
});

new Vue({
  el: "#articles",
  data: {
    loading: true,
    articles: {}
  },
  created() {
    console.log(this.loading);
    var self = this;

    axios
      .get(
        "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=1e641b65aa15478fb01b525d1d5d3063"
      )
      .then(function(response) {
        console.log(response);
        self.articles = response.data.articles;
        console.log(self.articles[0]);
        for (var i = 0; i < self.articles.length; i++) {
          var article = self.articles[i];
          article.title = article.title.substring(0, article.title.length - 6);
        }
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
    console.log(this.loading);
  }
});

new Vue({
  el: "#latestGames",
  data: {
    loading: true,
    latestGames: {}
  },
  created() {
    console.log(this.loading);
    var self = this;
    axios
      .get("http://localhost:8081/games/recent?limit=3")
      .then(function(response) {
        console.log("hello");
        self.loading = false;
        self.latestGames = response.data;
        for (var i = 0; i < self.latestGames.length; i++) {
          console.log(self.latestGames[i]);
          self.latestGames[i].href =
            "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid=" +
            self.latestGames[i].GameID;
        }
        self.loading = false;
        console.log(self.latestGames[0].href);
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
    console.log(this.loading);
  }
});

new Vue({
  el: "#latestReviews",
  data: {
    loading: true,
    latestGames: {}
  },
  created() {
    console.log(this.loading);
    var self = this;
    axios
      .get("http://localhost:8081/games/recent/review?limit=3")
      .then(function(response) {
        console.log("hello");
        self.loading = false;
        self.latestGames = response.data;
        for (var i = 0; i < self.latestGames.length; i++) {
          console.log(self.latestGames[i]);
          self.latestGames[i].href =
            "https://utsccscc01.github.io/final-project-team-8/app/web_pages/game_profile.html#/?gameid=" +
            self.latestGames[i].GameID;
        }
        self.loading = false;
        console.log(self.latestGames[0].href);
      })
      .catch(function(err) {
        console.log("error");
        console.log(err);
      });
    console.log(this.loading);
  }
});

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
