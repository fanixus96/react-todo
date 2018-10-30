import React, { Component } from 'react';
import Todo from './Todo.js';

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [{id:1, value:"pierwszy", done:false},{id:2, value:"drugi", done:false},{id:3, value:"trzeci", done:false},{id:4, value:"czwarty", done:false}],
    };
  }

  createTodo() {
  	var itemValue = document.getElementById("tvalue").value;
  	var newTodos = this.state.todos.slice(0);
  	newTodos.push({id:6, value:itemValue});
  	this.setState({
      todos: newTodos
    });
  	document.getElementById("tvalue").value = "";
  }

  render() {
    var self = this;

    return (
      <div>
      {this.state.todos.map(function(item) {
        return <Todo parent={self} item={item} />;
      })}
      	<input id="tvalue"/>
      	<button onClick={this.createTodo.bind(this)}> Create </button>
      </div>
    );
  }
}

export default List;
