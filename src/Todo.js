import React, { Component } from 'react';
import List from './List.js';

class Todo extends Component {

  createEvent() {

    var newValue = document.getElementById("taskInput").value;
    var newElement = {id:5, value:newValue}
    var newTodos = this.state.todos.slice(0);
    newTodos.push(newElement);
    this.props.List.setState({
      todos: newTodos
    });
     console.log(newElement.id)
  };

  editEvent() {
    console.log("edited")
  };

  deleteEvent(element) {
    var doneElement = this.todos.indexOf(this.state.element.id);

    console.log(doneElement)
  };

  render() {
    return (
      <div>
        <li>{this.props.item.value}</li>
      </div>
    );
  }
}

export default Todo;
