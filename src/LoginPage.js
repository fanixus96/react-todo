import React, { Component } from 'react';
import { Grid, Row, Col, Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import List from './List.js';
import './main.css';


class LoginPage extends Component {

	constructor(props) {
    super(props);

    this.state = {
       buttonStyle: "beforeClicked",
    };
  }

  buttonColorChange() {
  	this.setState({
      buttonStyle: "afterClicked",
    })
    fetch('https://tower-rails.herokuapp.com/auth/sign_in', { 
    	method: 'POST',
      	headers: {
	        'Accept': 'application/json, text/plain, */*',
	        'Content-Type': 'application/json',
      	},
      body: JSON.stringify({ email:'fanixus96@gmail.com', password: 'lubieplacki123' }) 
    }).then(function(response){
    		var cre = JSON.parse(response.headers.get('Uid'));
    		console.log(cre);
    	})

  }


	render() {
    	return (
    		<Router>
    		<Container>
      			<Form className={this.state.buttonStyle}> 
      				<FormGroup>
	      				<Label for="loginInput" className="mr-sm-2">Login</Label>
	      				<Input id="loginInput"/>
	        		</FormGroup>
	        		<FormGroup>
	      				<Label for="passwordInput" className="mr-sm-2">Password</Label>
	      				<Input id="passwordInput"/>
	        		</FormGroup>
	        		<Button id="loginButton"  onClick={this.buttonColorChange.bind(this)}>
		            		<Link to="/todo">login</Link>
		        		</Button>
        		</Form>
        		<Route path="/todo" component={List} />
        		</Container>
    </Router>
    	);
	}


}
export default LoginPage;