import React, { Component } from 'react';
import './main.css';

class RegisterPage extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      errorMessage: "error",
	      collapsed: false,
	    }
  	}
  	componentDidMount() {
  		window.$('#alertMessage').hide()
  	}

	async CreateAccount() {
 		try {
	 		var response = await fetch('https://tower-rails.herokuapp.com/auth', { 
		        method: 'POST',
		        headers: {
		          'Accept': 'application/json, text/plain, */*',
		          'Content-Type': 'application/json',
		          'uid': localStorage.getItem("uid"), 
		          'client': localStorage.getItem("client"), 
		          'Access-Token': localStorage.getItem("accessToken") 
		        },
		        body: JSON.stringify({
		        	email:document.getElementById('loginInput').value, 
	      			password: document.getElementById('passwordInput').value, 
	      			password_confirmation: document.getElementById('passwordConfirmationInput').value 
	      			})
	    	})
	    	return response;
 		
    	} catch(e) {
    		console.log(e)
    	}
	}

	async jsonHandling(){
		    var response = await this.CreateAccount();
		    var info = await response.json();
		    return info;
	}

	async reactionToResponse() {
		var fetchInfo = await this.jsonHandling()
		if (fetchInfo.status === "success") {
			window.location.reload();
		} else {
			window.$('#alertMessage').show();
			this.setState({
  				errorMessage:fetchInfo.errors.full_messages.join('. '), 
			})
		}
	}

	backToLoginPage() {
		window.location.reload();
	}

	enterPressed(event) {
		var code = event.keyCode || event.which;
	    if(code === 13) { 
	    	this.reactionToResponse();
	    } 
	}

	toggleNavbar() {
		this.setState({
	    	collapsed: !this.state.collapsed
	    })
  	}

	render() {
    	return (
    		<div className="container">
    				<div className="row">
    					<div className="col-md-12">
		              		<nav className="navbar">
		                		<span className="navbar-brand mb-0">React Todo App</span>
		                		<span onClick={this.backToLoginPage.bind(this)} className="btn btn-secondary justify-content-end">Login</span>
		              		</nav>
            			</div>
    				</div>
    				<div className="row">
	    				<div className="col"/>
		    			<div className="col">
			      			<form> 
			      				<div className="form-group">
				      				<label for="loginInput"/>
				      				<input id="loginInput" className="form-control" placeholder="Your email"/>
				        		</div>
				        		<div className="form-group">
				      				<label for="passwordInput"/>
				      				<input id="passwordInput" className="form-control" placeholder="password" type="password"/>
				        		</div>
				        		<div className="form-group">
				      				<label for="passwordConfirmationInput"/>
				      				<input type="password" 
				      					   id="passwordConfirmationInput" 
				      					   placeholder="password confirmation"  
				      					   onKeyPress={this.enterPressed.bind(this)}
				      					   className="form-control"
				      				/>
				        		</div>
				        		<div className="alert alert-danger" id="alertMessage" >
			        					{this.state.errorMessage}
			      				</div>
				        		<div className="btn btn-secondary" id="loginButton" onClick={this.reactionToResponse.bind(this)}>
			                	Create account
					        	</div>
			        		</form>
		        		</div>
		        		<div className="col"/>
	        		</div>
    		</div>
    	)
    }
}
export default RegisterPage;