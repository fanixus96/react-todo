import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './main.css';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
       open: false,
       status:"notDone"
    };
  }

  openAlert() {
    this.setState({ open: true })
  }

  editEvent() {
    var items = this.props.parent.state.todos;
    var newValue = document.getElementById("item-edit").value;
    var idx = items.indexOf(this.props.item)
    items[idx].value=newValue;
    this.props.parent.setState({
      todos: items
    });
    

  }
  
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

  eventDone() {
    this.setState({
      status: "done"
    });
  };

  render() {
    return (
      <div className="container">
        <li className={this.state.status} onClick={this.eventDone.bind(this)}>
          <Popup open={this.state.open}>
            <div>
              <input type="text" id="item-edit" defaultValue={this.props.item.value} onChange={this.editEvent.bind(this)}/>
            </div>
          </Popup>
          {this.props.item.value}
          <button onClick={this.openAlert.bind(this)}>Edit</button> 
          <button onClick={this.deleteEvent.bind(this)}>Delete</button> 
        </li>
      </div>
      
    );
  }
}

export default Todo;
