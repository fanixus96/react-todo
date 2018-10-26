import React, { Component } from 'react';
import List from './List.js';

class Todo extends Component {

  editEvent() {
    console.log("edited")
  };

  deleteEvent() {
     var items = this.parent.state.todos;
    //var idx = 
    //var idx = items.value.indexOf(function(currentItem){
     // return this.items.id == currentItem.id;
   // });

    //var reducedItems= this.items.splice(idx,1)

    //this.props.setState({
     // items: reducedItems
    //});
    

    //console.log(idx)
    console.log(items)
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
