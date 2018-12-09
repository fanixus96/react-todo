import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { ListGroup, ListGroupItem, Button, Input, Label, FormGroup } from 'reactstrap';
import Deserializer from './Deserializer.js'
import './main.css';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
       open: false,
    };
  }

  openAlert() {
    this.setState({ open: true })
  }

  closeAlert() {
    var items = this.props.parent.state.todos;
    var idx = items.indexOf(this.props.item);
    items[idx].color="info";
    this.props.parent.setState({
      todos: items
    });
    this.setState({
      open: false,
    })
  }

  async currentList () {
    var list = await Deserializer.userListId();
    var id = list[0].id;
    return id;
}

  async editEvent() {
    var listId = await this.currentList();
    var itemId = this.props.item.id;
    var items = this.props.parent.state.todos;
    var newTitle = document.getElementById("tedit").value;
    var newDetails = document.getElementById("tedit").value;
    var idx = items.indexOf(this.props.item)
    items[idx].title=newTitle;
    items[idx].color="info";
    this.props.parent.setState({
      todos: items
    });

     fetch('https://tower-rails.herokuapp.com/task_lists/'+listId+'/tasks/'+itemId, { 
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'uid': localStorage.getItem("uid"), 
              'client': localStorage.getItem("client"), 
              'Access-Token': localStorage.getItem("accessToken") 
            },
            body: JSON.stringify({content:newTitle, detials:newDetails,})
        }).then(function(response){
            localStorage.setItem("uid", response.headers.get('Uid'));
            localStorage.setItem("client", response.headers.get('Client'));
          })

    this.setState({
      open: false
    });

  }

  async deleteEvent() {
    var listId = await this.currentList();
    var items = this.props.parent.state.todos;
    var idx = items.indexOf(this.props.item)
    var itemId = this.props.item.id;
    console.log(this.props.item.id);
      if (idx!==-1){
        items.splice(idx,1)
         fetch('https://tower-rails.herokuapp.com/task_lists/'+listId+'/tasks/'+itemId, { 
            method: 'DELETE',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'uid': localStorage.getItem("uid"), 
              'client': localStorage.getItem("client"), 
              'Access-Token': localStorage.getItem("accessToken") 
            }
        }).then(function(response){
            localStorage.setItem("uid", response.headers.get('Uid'));
            localStorage.setItem("client", response.headers.get('Client'));
          })
      }
      this.props.parent.setState({
      todos: items
    });
  };

  eventDone() {
   var items = this.props.parent.state.todos;
   var idx = items.indexOf(this.props.item)
   if (idx!==-1){
        items[idx].color="warning";
      }

    this.props.parent.setState({
      todos: items
    });
  };

  render() {
    return (
      <div className="container">
        <ListGroup  onClick={this.eventDone.bind(this)}>
          <Popup open={this.state.open} closeOnDocumentClick={false}>
            <div>
                <FormGroup>
              <Label for="tedit" className="mr-sm-2">What needs to be done?</Label>
              <Input id="tedit" defaultValue={this.props.item.title}/>
            </FormGroup>
            <FormGroup>
              <Label for="dedit" className="mr-sm-2">Additional instructions</Label>
              <Input id="dedit" defaultValue={this.props.item.details}/>
            </FormGroup>
              <button onClick={this.editEvent.bind(this)}>Save</button>
              <button onClick={this.closeAlert.bind(this)}>Cancel</button>
            </div>
          </Popup>
          <ListGroupItem  color={this.props.item.color}>{this.props.item.title}</ListGroupItem>
          <Button color="primary" onClick={this.openAlert.bind(this)} block>Edit</Button>
          <Button color="secondary" onClick={this.deleteEvent.bind(this)} block>Delete</Button>
        </ListGroup>
      </div>

    );
  }
}

export default Todo;
