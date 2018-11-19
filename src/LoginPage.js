import React, { Component } from 'react';
import { Grid, Row, Col, Container, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import { Router, Route, Link } from "react-router-dom";
import Navigator from './Navigator.js';
import './main.css';



class LoginPage extends Component {

  componentWillMount() {
    if (localStorage.getItem("accessToken") === "null" || localStorage.getItem("accessToken") === null) {
       this.setState({
        buttonStyle: "beforeClicked"
      });
       console.log("beforeClicked")
    } else {
      this.setState({
        buttonStyle: "afterClicked",
      });
      console.log(localStorage.getItem("accessToken"))
    }
  }

	constructor(props) {
    super(props);
    this.state = {
      buttonStyle: "beforeClicked",
      visible: false,
    }
  }

  navigateToCalendar() {
  	this.props.history.push("/todo");
  }
  navigateToRegisterPage() {
  	this.props.history.push("/registerpage");
  }

  buttonColorChange() {
  	var self = this;
  	
    fetch('https://tower-rails.herokuapp.com/auth/sign_in', { 
    	method: 'POST',
      	headers: {
	        'Accept': 'application/json, text/plain, */*',
	        'Content-Type': 'application/json',
      	},
      	body: JSON.stringify({ email:document.getElementById('loginInput').value, password: document.getElementById('passwordInput').value }) 
    }).then(function(response){
    		localStorage.setItem("uid", response.headers.get('Uid'));
    		localStorage.setItem("accessToken", response.headers.get('Access-Token'));
    		localStorage.setItem("client", response.headers.get('Client'));
        	console.log(localStorage.getItem("accessToken"))

	        if (localStorage.getItem("accessToken") === "null") {
	        	console.log("wrong credentials")
	        	self.setState({
	        		visible: true,
	        	})
	        } else {
	    			window.location.reload();
	    		}
        })

  }

	render() {
    	return (
    		<Container className={this.state.buttonStyle}>
    			<Row>
    				<Col/>
	    			<Col xs="6" sm="6">
		      			<Form > 
		      				<FormGroup>
			      				<Label for="loginInput" className="mr-sm-2">Login</Label>
			      				<Input id="loginInput"/>
			        		</FormGroup>
			        		<FormGroup>
			      				<Label for="passwordInput" className="mr-sm-2">Password</Label>
			      				<Input type = "submit" type="password" id="passwordInput"/>
			      				<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
		        					The username or password you entered did not match our records. Please double-check and try again.
		      					</Alert>
			        		</FormGroup>
			        		<Button id="loginButton"  onClick={this.buttonColorChange.bind(this)}>
		                	Login
				        	</Button>
		        		</Form>
	        		</Col>
	        		<Col>
	        			<Button onClick={this.navigateToRegisterPage.bind(this)}>
	        				Register
	        			</Button>
	        		</Col>
            	 </Row>
        		</Container>
 
    	);
	}


}
export default LoginPage;
