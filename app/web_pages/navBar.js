Vue.component("navbar", {
  props: ["name"],
  data() {
    return {
      username: "",
      password: "",
      reg_username: "",
      reg_password: ""
    };
  },
  template: `<div class = "container" style = "width:100%;padding:0">
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse"> 
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active "><a class=" nav-item nav-link " href="# "><i class="fa fa-gamepad" style="font-size:48px;" aria-hidden="true"></i></a></li>
        <li style = "font-size:20pt;margin-left:20px; margin-top:10px" class="nav-item active "><a class=" nav-item nav-link " href=" # ">Forum</a></li>
        <li style = "font-size:20pt;margin-left:20px;margin-top:10px" class="nav-item active "><a class=" nav-item nav-link " href="# ">Games</a></li>
        <li style = "font-size:20pt;margin-left:20px;margin-top:10px" class="nav-item active "><a class=" nav-item nav-link " href="# ">About Us</a></li>
      </ul>
      <form class="form-inline pull-xs-right">
        <div class="input-group">
        <input class="form-control" type="text " placeholder="Search ">
        <button class="btn btn-secondary-outline btn-sm" style = "margin-right:10px;background-color:#f2f2f2" type="submit"><i class="fa fa-search"></i></button>
        </div>
        <div class="btn-group btn-group">
        <a class="btn btn-secondary"  style = "margin-left: 15px" href="#"><i class="fa fa-user fa-fw"></i> </a>
        <a class="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown" href="#">
        </a>
        <div class="dropdown-menu dropdown-menu-right" style = "margin-top:10px">
          <button data-toggle="modal" data-target="#exampleModal" class="dropdown-item" style = "margin-bottom:10px" type="button">Login</button>
          <button data-toggle="modal" data-target="#register"class="dropdown-item" type="button">Sign Up</button>
        </div>        
        </div>        
      </form>
    </div>
  </nav>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sign In</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
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
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
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
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-on:click="Register" class="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  
  </div>`,
  methods: {
    SignIn: function() {
      const submit = {
        "username ": username,
        "password ": password
      };
      console.log(submit);
      axios
        .post("http://127.0.0.1:8081/signin", submit)
        .then(function(res) {
          console.log("sucessfully posted ");
          console.log(res.data);
        })
        .catch(function(err) {
          console.log("failed ");
        });
    },
    Register: function() {
      const submit = {
        "username ": reg_username,
        "password ": reg_password
      };
      console.log(submit);
      /*      axios
        .post("http://127.0.0.1:8081/register", submit)
        .then(function(res) {
          console.log("sucessfully posted ");
          console.log(res.data);
        })
        .catch(function(err) {
          console.log("failed ");
        });*/
    }
  }
});

new Vue({
  el: "#navbar"
});
