import React, { Component } from 'react';
import './main.css';



class LoginPage extends Component {

  componentWillMount() {
    if (localStorage.getItem("uid") === "null" || localStorage.getItem("uid") === null) {
      this.setState({
        buttonStyle: "beforeClicked container"
      });
    } else {
      this.setState({
        buttonStyle: "afterClicked",
      });
    }
  }

  componentDidMount() {
    window.$('#wrong-pass').hide();
  }

	constructor(props) {
    super(props);
    this.state = {
      buttonStyle: "beforeClicked",
      visible: false,
      collapsed: false,
    }
  }

  navigateToCalendar() {
  	this.props.history.push("/todo");
  }
  navigateToRegisterPage() {
  	this.props.history.push("/registerpage");
  }

  buttonColorChange() {
    fetch('https://tower-rails.herokuapp.com/auth/sign_in', { 
    	method: 'POST',
      headers: {
	     'Accept': 'application/json, text/plain, */*',
	     'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email:document.getElementById('loginInput').value, password: document.getElementById('passwordInput').value }) 
    }).then(function(response){
    		localStorage.setItem("uid", response.headers.get('Uid'));
    		localStorage.setItem("accessToken", response.headers.get('Access-Token'));
    		localStorage.setItem("client", response.headers.get('Client'));
        if (localStorage.getItem("accessToken") === "null") {
          document.getElementById("passwordInput").value = "";  
        	window.$('#wrong-pass').show();
        } else {
    			window.location.reload();
    		}
      })
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { 
      this.buttonColorChange();
    } 
  }

  render() {
    return (
      <div className={this.state.buttonStyle}>
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar">
              <span className="navbar-brand mb-0">React Todo App</span>
              <span onClick={this.navigateToRegisterPage.bind(this)} className="btn btn-secondary justify-content-end">Register</span>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col"/>
          <div className="col">
            <form> 
              <div className="form-group">
                <label className="mr-sm-2">Login</label>
                <input className="form-control" id="loginInput"/>
              </div>
              <div className="form-group">
                <label className="mr-sm-2">Password</label>
                <input className="form-control" type="password" id="passwordInput" onKeyPress={this.enterPressed.bind(this)}/>
                <div className="alert alert-danger" id="wrong-pass">
                The username or password you entered did not match our records. Please double-check and try again.
                </div>
              </div>
              <div className="btn btn-secondary" id="loginButton"  onClick={this.buttonColorChange.bind(this)}>
                Login
              </div>
            </form>
          </div>
          <div className="col"/>
        </div>
      </div>
    );
  }
}
export default LoginPage;
