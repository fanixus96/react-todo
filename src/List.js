import React, { Component } from 'react';
import Todo from './Todo.js';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TaskCalendar from './TaskCalendar.js';
import Deserializer from './Deserializer.js'
import { Row, Col, Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './main.css';

class List extends Component {

    async componentWillMount() {
    if (localStorage.getItem("uid") === "null" || localStorage.getItem("uid") === null) {
       this.setState({
        listClass: "afterClicked"
      });
       this.props.history.push("/")
    } else {
      this.loadRemoteTodos()
      this.setState({
        listClass: "list",
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
    };
  }

async loadRemoteTodos() {
  var tablica = await Deserializer.asyncTodos();
  console.log(tablica)
  this.setState({
        todos: tablica
      });
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

  createTodo() {
    var self = this;
    var itemValue = document.getElementById("tvalue").value;
    var newTodos = this.state.todos.slice(0);
    var time = moment(this.state.startDate).format('YYYY-MM-DD');
    newTodos.push({title:itemValue, color:"info", start:time});
    this.setState({
      todos: newTodos
    });
    console.log(time)
        fetch('https://tower-rails.herokuapp.com/task_lists/1/tasks', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'uid': localStorage.getItem("uid"), 
          'client': localStorage.getItem("client"), 
          'Access-Token': localStorage.getItem("accessToken") 
        },
        body: JSON.stringify({content:itemValue, happens_at:time}) 
    }).then(function(response){
        localStorage.setItem("uid", response.headers.get('Uid'));
        localStorage.setItem("client", response.headers.get('Client'));
          
        })
    document.getElementById("tvalue").value = "";
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
