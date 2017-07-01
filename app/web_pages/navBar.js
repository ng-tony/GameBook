Vue.component("navbar", {
  props: ["name"],
  data() {
    return {
      title: "",
      url:
        "https://utsccscc01.github.io/final-project-team-8/app/web_pages/search_results.html#/?title=",
      username: "",
      password: "",
      reg_username: "",
      reg_password: "",
      signedIn: false,
      success: false,
      warning: false
    };
  },
  template: `<div class = "container" style = "width:100%;padding:0">
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse"> 
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active "><a class=" nav-item nav-link " href="https://utsccscc01.github.io/final-project-team-8/app/web_pages/main_page.html"><i class="fa fa-gamepad" style="font-size:48px;" aria-hidden="true"></i></a></li>
        <li style = "font-size:20pt;margin-left:20px; margin-top:10px" class="nav-item active "><a class=" nav-item nav-link " href=" # ">Forum</a></li>
        <li style = "font-size:20pt;margin-left:20px;margin-top:10px" class="nav-item active "><a class=" nav-item nav-link " href="# ">Games</a></li>
        <li style = "font-size:20pt;margin-left:20px;margin-top:10px" class="nav-item active "><a class=" nav-item nav-link " href="# ">About Us</a></li>
      </ul>
      <form class="form-inline pull-xs-right" v-bind:action="url + title">
        <div class="input-group">
        <input class="form-control"  v-model ="title" id = "title" type="text " placeholder="Search ">
        <button class="btn btn-secondary-outline" type="submit" style = "margin-right:10px;background-color:#f2f2f2"><i class="fa fa-search"></i></button>
        </div>
        <div class="btn-group btn-group">
        <a class="btn btn-secondary"  style = "margin-left: 15px" href="#"><i class="fa fa-user fa-fw"></i> </a>
        <a class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" href="#">
        </a>
        <template v-if="signedIn">
          <div class="dropdown-menu dropdown-menu-right" style = "margin-top:10px">
            <button data-toggle="modal" data-target="#exampleModal" class="dropdown-item" style = "margin-bottom:10px" type="button">My Profile</button>
            <button data-toggle="modal" data-target="#register"class="dropdown-item" type="button">Friends</button>
            <button style = "margin-top: 10px" v-on:click = "logOut" class="dropdown-item" type="button">Log Out</button>
          </div> 
        </template>
        <template v-else>
          <div class="dropdown-menu dropdown-menu-right" style = "margin-top:10px">
            <button data-toggle="modal" data-target="#exampleModal" class="dropdown-item" style = "margin-bottom:10px" type="button">Sign In</button>
            <button data-toggle="modal" data-target="#register"class="dropdown-item" type="button">Sign Up</button>
          </div>
        </template>       
        </div>        
      </form>
    </div>
  </nav>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
            <button type="button" v-on:click ="Reset" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
            <p v-show= "warning" class ="text-warning">Wrong Password or UserName</p>
            <p v-show= "success" class ="text-success">Successfully Logged In</p>
            <form>
              <div class="form-group">
                <label for="recipient-name" class="form-control-label">Username:</label>
                <input type="text" v-model="username" class="form-control" id="username">
              </div>
              <div class="form-group">
                <label for="message-text" class="form-control-label">Password:</label>
                <input type="password" v-model="password"class="form-control" id="password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" v-on:click ="Reset" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="SignIn"class="btn btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    </div>
      <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
            <button type="button" v-on:click ="Reset" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
            <p v-if= "warning" class ="text-danger">Illegal Password or UserName or UserName already in use</p>
            <p v-if= "success" class ="text-success">Successfully Registered</p>
            <form>
              <div class="form-group">
                <label for="recipient-name" class="form-control-label">Username:</label>
                <input type="text" v-model="reg_username" class="form-control" id="reg-username">
              </div>
              <div class="form-group">
                <label for="message-text" class="form-control-label">Password:</label>
                <input type="password" v-model="reg_password" class="form-control" id="reg-password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button"  v-on:click ="Reset" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="Register" class="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  
  </div>`,
  mounted: function() {
    this.$nextTick(function() {
      console.log(sessionStorage.getItem("signedIn"));
      this.signedIn = sessionStorage.getItem("signedIn");
    });
  },
  methods: {
    Reset: function() {
      this.warning = false;
      this.success = false;
    },
    SignIn: function() {
      const submit = {
        username: this.username,
        password: this.password
      };
      console.log(submit);
      const self = this;
      axios
        .post("http://127.0.0.1:8081/signin", submit)
        .then(function(res) {
          console.log("sucessfully posted ");
          console.log(res.data);
          sessionStorage.setItem("signedIn", res.data);
          if (res.data == false) {
            self.warning = true;
          } else {
            self.success = true;
            self.signedIn = true;
          }
        })
        .catch(function(err) {
          console.log("failed ");
        });
    },
    Register: function() {
      const submit = {
        username: this.reg_username,
        password: this.reg_password
      };
      if (submit.username == "" || submit.password == "") {
        this.warning = true;
      } else {
        console.log(submit);
        var self = this;
        axios
          .post("http://127.0.0.1:8081/register", submit)
          .then(function(res) {
            console.log("sucessfully posted ");
            console.log(res.data);
            console.log(res.data == "IN_USE");
            if (res.data == "IN_USE") {
              console.log("here");
              self.warning = true;
            } else {
              self.success = true;
            }
          })
          .catch(function(err) {
            console.log("failed ");
          });
      }
    },
    logOut: function(){
      this.signedIn = false;
      sessionStorage.setItem("signedIn", false);
    }
  }
});

new Vue({
  el: "#navbar"
});
