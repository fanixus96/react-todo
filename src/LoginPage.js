import React, { Component } from 'react';
import { Grid, Row, Col, Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Router, Route, Link } from "react-router-dom";

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
    }
  }

  buttonColorChange() {
  	
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
          console.log("no way")
        } 
    		
    	})

  }




	render() {
    	return (
    		
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
                	Login
		        	</Button>
        		</Form>
            	 
        		</Container>
 
    	);
	}


}
export default LoginPage;
