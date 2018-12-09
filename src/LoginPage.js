import React, { Component } from 'react';
import { Row, Col, Container, Button, Form, FormGroup, Label, Input, Alert, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, DropdownItem} from 'reactstrap';
import './main.css';



class LoginPage extends Component {

  componentWillMount() {
    if (localStorage.getItem("uid") === "null" || localStorage.getItem("uid") === null) {
       this.setState({
        buttonStyle: "beforeClicked"
      });
       console.log("beforeClicked")
    } else {
      this.setState({
        buttonStyle: "afterClicked",
      });
    }
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
  	var self = this;
  	
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
        	console.log(localStorage.getItem("accessToken"))

	        if (localStorage.getItem("accessToken") === "null") {
            document.getElementById("passwordInput").value = "";  
	        	console.log("wrong credentials")
	        	self.setState({
	        		visible: true,
	        	})
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

 toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

	render() {
    	return (
    		<Container className={this.state.buttonStyle}>
          <Row>
            <Col>
               <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">react todo app</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                  <Nav navbar>
                    <NavItem>
                      <DropdownItem onClick={this.navigateToRegisterPage.bind(this)}>Register</DropdownItem>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
          </Row>
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
			      				<Input type="password" id="passwordInput" onKeyPress={this.enterPressed.bind(this)}/>
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
  	        		</Col>
              </Row>
        		</Container>
 
    	);
	}


}
export default LoginPage;
