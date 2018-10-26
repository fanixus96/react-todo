import React, { Component } from 'react';
import List from './List.js';

class Todo extends Component {

  editEvent() {
    console.log("edited")
  };

  deleteEvent() {
    var items = this.props.parent.state.todos;
    var idx = items.indexOf(this.props.item)
      if (idx!=-1){
        items.splice(idx,1)
      }
    this.props.parent.setState({
      todos: items
    });
  };

  render() {
    return (
      <div>
        <li onClick={this.deleteEvent.bind(this)}>{this.props.item.value} </li>
      </div>
    );
  }
}

export default Todo;
