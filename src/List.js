import React, { Component } from 'react';
import Todo from './Todo.js';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TaskCalendar from './TaskCalendar.js';
import { Row, Col, Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './main.css';

class List extends Component {

    componentWillMount() {
    if (localStorage.getItem("accessToken") === "null" || localStorage.getItem("accessToken") === null) {
       this.setState({
        listClass: "afterClicked"
      });
       this.props.history.push("/")
    } else {
      this.setState({
        listClass: "list",
      });
      this.getTodos();
    }
  }

 
  constructor(props) {
    super(props);

    this.state = {
      todos: [
      {id:'1', title:"pierwszy", color: "info", start: '2018-11-02'},
      {id:'2', title:"drugi", color: "info", start: '2018-11-03'},
      {id:'3', title:"trzeci", color: "info", start: '2018-11-04'},
      {id:'4', title:"czwarty", color: "info", start: '2018-11-05'}
      ],
      open: false,
      startDate: moment(),
      listClass: "list",
    };
  }

  getTodos() {
    console.log(localStorage.getItem("uid"));
    console.log(localStorage.getItem("client"));
    console.log(localStorage.getItem("accessToken"));
    fetch('https://tower-rails.herokuapp.com/task_lists', { 
        method: 'Get',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'uid': localStorage.getItem("uid"), 
          'client': localStorage.getItem("client"), 
          'Access-Token': localStorage.getItem("accessToken") 
        },
    }).then(function(response){
      console.log(response)
    })
  }

  openAlert() {
    this.setState({
      open: true
    })
  }

  dateChange(date){
    this.setState({
      startDate: date
    });
  }

  createTodo(newTodos, itemValue) {
    newTodos.push({id:6, title:itemValue, color:"info", start:moment(this.state.startDate).format('YYYY-MM-DD')});
    this.setState({
      todos: newTodos
    });
    document.getElementById("tvalue").title = "";
     this.setState({
      open: false
    })
  }

  backgroundClicked() {
    this.setState({
      open: false
    })
  }

  signOut() {
  	localStorage.clear();
  	window.location.reload();
  }

  render() {
    var self = this;

    return (
      <div className={this.state.listClass}>
        <Container>
          <Popup open={this.state.open} onClose={this.backgroundClicked.bind(this)}>
          <Form inline>
            <FormGroup>
              <Label for="tvalue" className="mr-sm-2">What needs to be done?</Label>
              <Input id="tvalue"/>
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
            <Col>
            {this.state.todos.map(function(item) {
              return <Todo parent={self} item={item} key={item.id}/>
            	})}
              <Button outline color="primary" size="lg" onClick={this.openAlert.bind(this)}> New </Button>
              </Col>
              <Col>
              <TaskCalendar events={this.state.todos} parent={self} />
              </Col>
              <Col sm="1" >
              	<Button onClick={this.signOut.bind(this)}> Sign out </Button>
          	  </Col>
          </Row>
          </Container>
      </div>
    );
  }
}

export default List;
