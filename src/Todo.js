import React, { Component } from 'react';
import './App.css';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [{id:1, value:"pierwszy"},{id:2, value:"drugi"},{id:3, value:"trzeci"},{id:4, value:"czwarty"}],
    };
  };


  createEvent() {

    var newElement = document.getElementById("taskInput").value;
    var newTodos = this.state.todos.slice(0);
    newTodos.push({id:5, value:newElement});
    this.setState({
      todos: newTodos
    });
     console.log(this.state.todos)
  };

  editEvent() {

  };

  deleteEvent() {

  };

  render() {
    return (
      <div>
        <ul>
          {this.state.todos.map(function(element){
                    return <li key={element.value}>{element.value}</li>;

                  })}
        </ul>
        <input id="taskInput" placeholder="create task"/>
        <button onClick={this.createEvent.bind(this)}>New Task</button>
      </div>
    );
  }
}

export default Todo;
