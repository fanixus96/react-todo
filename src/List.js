import React, { Component } from 'react';
import Todo from './Todo.js';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [{id:1, value:"pierwszy"},{id:2, value:"drugi"},{id:3, value:"trzeci"},{id:4, value:"czwarty"}],
    };
  }

  createTodo() {
  	var itemValue = document.getElementById("tvalue").value;
  	var newTodos = this.state.todos.slice(0);
  	newTodos.push({id:6, value:itemValue});
  	this.setState({
      todos: newTodos
    });
  	  	console.log(this.state.todos)
  	document.getElementById("tvalue").value = "";
  }

  render() {
    return (
      <div>
      {this.state.todos.map(function(item) {
        return <Todo parent={this} item={item} />;
      })}
      	<input id="tvalue"/>
      	<button onClick={this.createTodo.bind(this)}> Create </button>
      </div>
    );
  }
}

export default List;
