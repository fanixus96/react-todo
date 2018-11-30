import React, { Component } from 'react';
import { Row, Col, Container, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import './main.css';

class RegisterPage extends Component {

		constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

	passwordComparison() {
		var password = document.getElementById('passwordInput').value;
		var passwordConfirmation = document.getElementById('passwordConfirmationInput').value;
		
		return (password === passwordConfirmation);
	}

	CreateAccount() {
		if (this.passwordComparison()) {
			fetch('https://tower-rails.herokuapp.com/auth/', { 
    			method: 'POST',
      			headers: {
	        		'Accept': 'application/json, text/plain, */*',
	        		'Content-Type': 'application/json'
      			},
      			body: JSON.stringify({ email:document.getElementById('loginInput').value, 
      								   password: document.getElementById('passwordInput').value, 
      								   password_confirmation: document.getElementById('passwordInput').value 
      			}) 
    		})
    		window.location.reload();
		} else {
			this.setState({
	        		visible: true,
	        	})
		}
	}

	backToLoginPage() {
		window.location.reload();
	}

	 enterPressed(event) {
	    var code = event.keyCode || event.which;
	    if(code === 13) { 
	      this.CreateAccount();
	    } 
}

	render() {
    	return (
    		<div>
    			<Container>
    				<Row>
	    				<Col/>
		    			<Col>
			      			<Form > 
			      				<FormGroup>
				      				<Label for="loginInput" className="mr-sm-2"/>
				      				<Input id="loginInput" placeholder="Your Login"/>
				        		</FormGroup>
				        		<FormGroup>
				      				<Label for="passwordInput" className="mr-sm-2"/>
				      				<Input id="passwordInput" placeholder="password" type="password"/>
				        		</FormGroup>
				        		<FormGroup>
				      				<Label for="passwordConfirmationInput" className="mr-sm-2"/>
				      				<Input type="passwordConfirmationInput" id="passwordConfirmationInput" placeholder="password confirmation" type="password" onKeyUp={this.passwordComparison.bind(this)} onKeyPress={this.enterPressed.bind(this)}/>
				      				<Alert color="danger" isOpen={this.state.visible}>
			        					The username or password you entered did not match our records. Please double-check and try again.
			      					</Alert>
				        		</FormGroup>
				        		<Button id="loginButton" onClick={this.CreateAccount.bind(this)}>
			                	Create account
					        	</Button>
			        		</Form>
		        		</Col>
		        		<Col>
		        			<Button onClick={this.backToLoginPage.bind(this)}>
		        				Back
		        			</Button>
		        		</Col>
	        		</Row>
	        	</Container>
    		</div>
    	)
    }
}
export default RegisterPage;