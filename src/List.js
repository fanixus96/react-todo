import React, { Component } from 'react';
import Todo from './Todo.js';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TaskCalendar from './TaskCalendar.js';
import { Grid, Row, Col, Container } from 'reactstrap';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [
      { title:"pierwszy", status: "notDone", start: '2018-11-02'},
      { title:"drugi", status: "notDone", start: '2018-11-03'},
      { title:"trzeci", status: "notDone", start: '2018-11-04'},
      { title:"czwarty", status: "notDone", start: '2018-11-05'}
      ],
      open: false,
      startDate: moment()
    };
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
    console.log(this.state.startDate)
  }

  createTodo() {
  	var itemValue = document.getElementById("tvalue").value;
  	var newTodos = this.state.todos.slice(0);
  	newTodos.push({id:6, title:itemValue, status:"notDone", start:this.state.startDate});
  	this.setState({
      todos: newTodos
    });
  	document.getElementById("tvalue").title = "";
     this.setState({ 
      open: false
    })
    console.log(newTodos)
  }


  render() {
    var self = this;

    return (
      <Container>
      <Row>
        <Col>
        {this.state.todos.map(function(item) {
          return <Todo parent={self} item={item} />;
        })}
        <Popup open={this.state.open}>
        	<input id="tvalue"/>
          <DatePicker
            dateFormat="YYYY-MM-DD"
            selected={this.state.startDate}
            onChange={this.dateChange.bind(this)}
          />
          <button onClick={this.createTodo.bind(this)}> Create </button>
          </Popup>
        	<button onClick={this.openAlert.bind(this)}> New </button>
          </Col>
          <Col>
          </Col>
        </Row>
        <TaskCalendar events={this.state.todos}/>
      </Container>
    );
  }
}

export default List;
