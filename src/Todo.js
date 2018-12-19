import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { ListGroup, ListGroupItem, Button, Input, Label, FormGroup, Col, Row, Alert } from 'reactstrap';
import Deserializer from './Deserializer.js'
import './main.css';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
       open: false,
       inputClass: "default",
    };
  }

  openAlert() {
    this.setState({
     open: true 
   })
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
    if (newTitle.length == 0) {
      this.setState({
        inputClass: "blank"
      })
    } else {
        var newDetails = document.getElementById("tedit").value;
        var idx = items.indexOf(this.props.item)
        items[idx].title=newTitle;
        items[idx].color="info";
        this.props.parent.setState({
          todos: items
        });
          await Deserializer.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+listId+'/tasks/'+itemId,'PUT',{content:newTitle, details:newDetails})

        this.setState({
          open: false
        });
    }
  }

  async deleteEvent() {
    var listId = await this.currentList();
    var items = this.props.parent.state.todos;
    var idx = items.indexOf(this.props.item)
    var itemId = this.props.item.id;
    console.log(this.props.item.id);
      if (idx!==-1){
        items.splice(idx,1)
        await Deserializer.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+listId+'/tasks/'+itemId,'DELETE')
      }
      this.props.parent.setState({
      todos: items
    });
  };

  render() {
    return (
      <div >
        <Col>
          <ListGroup>
            <Alert isOpen={this.state.open}>
              <div>
                <FormGroup>
                  <Label for="tedit" className="mr-sm-2">What needs to be done?</Label>
                  <Input id="tedit" defaultValue={this.props.item.title} className={this.state.inputClass}/>
                </FormGroup>
                <FormGroup>
                  <Label for="dedit" className="mr-sm-2">Additional instructions</Label>
                  <Input id="dedit" defaultValue={this.props.item.details}/>
                </FormGroup>
                <button onClick={this.editEvent.bind(this)}>Save</button>
                <button onClick={this.closeAlert.bind(this)}>Cancel</button>
              </div>
            </Alert>
            <ListGroupItem color={this.props.item.color} className={"itemClass"}>{this.props.item.title}</ListGroupItem>
            <Row>
            <Col>
            <Button outline color="primary" onClick={this.openAlert.bind(this)} block>Edit</Button>
            </Col>
            <Col>
            <Button outline color="danger" onClick={this.deleteEvent.bind(this)} block>Delete</Button>
            </Col>
            </Row>
          </ListGroup>
        </Col>
      </div>

    );
  }
}

export default Todo;
