import React, { Component } from 'react';
import Todo from './Todo.js';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TaskCalendar from './TaskCalendar.js';
import Deserializer from './Deserializer.js'
import { Row, Col, Container, Button, Form, FormGroup, Label, Input, Alert, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, DropdownItem, ListGroup, ListGroupItem} from 'reactstrap';
import { BounceLoader } from 'react-spinners';
import './main.css';

class List extends Component {

  async componentWillMount() {
    if (localStorage.getItem("uid") === "null" || localStorage.getItem("uid") === null) {
      this.setState({
        listClass: "afterClicked",
      });
      this.props.history.push("/")
    } else {
      this.loadRemoteTodos()
      this.setState({
        listClass: "list",
        loading: true,
      });
    }
  }
 
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todos1: [],
      open: false,
      startDate: moment(),
      listClass: "list",
      visible: false,
      title: "",
      details: "",
      collapsed: false,
      loading: false,
      inputClass: "default",
    };
  }

async loadRemoteTodos() {
  var RemoteTodos = await Deserializer.asyncTodos();
  this.setState({
    todos: RemoteTodos,
    loading: false,
  });
}

async currentList () {
  var list = await Deserializer.userListId();
  var id = list[0].id;
  return id;
}

  openAlert() {
    this.setState({
      open: true
    });
  }

  dateChange(date){
    this.setState({
      startDate: date
    });
  }

  async createTodo() {
    var id = await this.currentList();
    var itemValue = document.getElementById("tvalue").value;
    if (itemValue.length == 0) {
      this.setState({
        inputClass: "blank"
      })
    } else {
        var detailsValue = document.getElementById("dvalue").value;
        var newTodos = this.state.todos.slice(0);
        var time = moment(this.state.startDate).format('YYYY-MM-DD');
        newTodos.push({title:itemValue, details:detailsValue, color:"info", start:time});
        this.setState({
          todos: newTodos
        });
        await Deserializer.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+id+'/tasks','POST',{content:itemValue, happens_at:time, details:detailsValue})
        document.getElementById("tvalue").value = "";
        this.setState({
          open: false
        })
    }

  }

 
  backgroundClicked() {
    this.setState({
      open: false
    })
  }

  signOut() {
    this.setState({
      loading: true,
    })
  	localStorage.clear();
  	window.location.reload();
  }

  onDismiss() {
    this.setState({
     visible: false 
   });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    var self = this;
    if (this.state.loading) {
      return (
        <div className='loading'>
        <BounceLoader
          color={'#007bff'}
          loading={this.state.loading}
        />
        </div>
        )
    } else {
      return (
        <div className={this.state.listClass}>
          <Container>
            <Row>
              <Col>
                <Navbar color="faded" light>
                  <NavbarBrand className="mr-auto">react todo app</NavbarBrand>
                  <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
                  <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>
                      <NavItem>
                        <DropdownItem onClick={this.signOut.bind(this)}>Logout</DropdownItem>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
              </Col>
            </Row>
            <Popup open={this.state.open} onClose={this.backgroundClicked.bind(this)}>
            <Form >
              <FormGroup>
                <Label for="tvalue" className="mr-sm-2">What needs to be done?</Label>
                <Input id="tvalue" className={this.state.inputClass}/>
              </FormGroup>
              <FormGroup>
                <Label for="dvalue" className="mr-sm-2">Additional instructions</Label>
                <Input id="dvalue"/>
              </FormGroup>
              <FormGroup>
                <Label for="tcalendar" className="mr-sm-2">When?</Label>
                <div id="tcalendar">
                  <DatePicker
                    dateFormat="YYYY-MM-DD"
                    selected={this.state.startDate}
                    onChange={this.dateChange.bind(this)}
                  />
                </div>
              </FormGroup>
              <Button onClick={this.createTodo.bind(this)}> Create </Button>
              </Form>
              </Popup>
            <Row>
              <Col className="column">
                <ListGroup>
                  <ListGroupItem>
                    {this.state.todos.map(function(item) {
                      return <Todo parent={self} item={item} key={item.id}/>
                  	})}
                  </ListGroupItem>
                    <Button outline color="primary" size="lg" onClick={this.openAlert.bind(this)}> New </Button>
                  </ListGroup>
                </Col>
                <Col>
                  <TaskCalendar events={this.state.todos} parent={self} />
                  <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss.bind(this)}>
                    <h4 className="alert-heading">Task details:</h4>
                    <p>
                      {this.state.title}
                    </p>
                    <hr />
                    <p className="mb-0">
                      {this.state.details}
                    </p>
                </Alert>
                </Col>
                <Col sm="1" >
            	  </Col>
            </Row>
            <Row/>
            </Container>
        </div>
      );
  }
}
}

export default List;
