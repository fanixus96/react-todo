import React, { Component } from 'react';
import { Row, Col, Container, Button, Form, FormGroup, Label, Input, Alert, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, DropdownItem} from 'reactstrap';
import './main.css';
import Deserializer from './Deserializer.js'

class RegisterPage extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      visible: false,
	      errorMessage: "error",
	      collapsed: false,
	    }
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
			        body: JSON.stringify({ email:document.getElementById('loginInput').value, 
		      								   password: document.getElementById('passwordInput').value, 
		      								   password_confirmation: document.getElementById('passwordConfirmationInput').value 
		      			})
		    	})
		    	return response;
	 			 
	    	} catch (e) {
	    		console.log(e)
	    	}
	}

	async jsonHandling(){
		    let response = await this.CreateAccount();
		    var info = await response.json();
		    return info;
	}

	async reactionToResponse() {
		var fetchInfo = await this.jsonHandling()
		if (fetchInfo.status === "success") {

			window.location.reload();

		}	else {
				this.setState({
      				visible: true,
      				errorMessage:fetchInfo.errors.full_messages.join('. '), 
    			});
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
	    });
  	}

	render() {
    	return (
    		<div>
    			<Container>
    				<Row>
    					<Col>
               				<Navbar color="faded" light>
				                <NavbarBrand className="mr-auto">react todo app</NavbarBrand>
				                <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
				                <Collapse isOpen={this.state.collapsed} navbar>
				                  <Nav navbar>
				                    <NavItem>
				                      <DropdownItem onClick={this.backToLoginPage.bind(this)}>Login</DropdownItem>
				                    </NavItem>
				                  </Nav>
				                </Collapse>
              				</Navbar>
            			</Col>
    				</Row>
    				<Row>
	    				<Col/>
		    			<Col>
			      			<Form > 
			      				<FormGroup>
				      				<Label for="loginInput" className="mr-sm-2"/>
				      				<Input id="loginInput" placeholder="Your email"/>
				        		</FormGroup>
				        		<FormGroup>
				      				<Label for="passwordInput" className="mr-sm-2"/>
				      				<Input id="passwordInput" placeholder="password" type="password"/>
				        		</FormGroup>
				        		<FormGroup>
				      				<Label for="passwordConfirmationInput" className="mr-sm-2"/>
				      				<Input type="passwordConfirmationInput" 
				      					   id="passwordConfirmationInput" 
				      					   placeholder="password confirmation" 
				      					   type="password" 
				      					   onKeyPress={this.enterPressed.bind(this)}
				      				/>
				      				<Alert color="danger" isOpen={this.state.visible}>
			        					{this.state.errorMessage}
			      					</Alert>
				        		</FormGroup>
				        		<Button id="loginButton" onClick={this.reactionToResponse.bind(this)}>
			                	Create account
					        	</Button>
			        		</Form>
		        		</Col>
		        		<Col>
		        		</Col>
	        		</Row>
	        	</Container>
    		</div>
    	)
    }
}
export default RegisterPage;