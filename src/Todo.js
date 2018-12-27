import React, { Component } from 'react';
import Deserializer from './Deserializer.js'
import './main.css';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
       open: false,
       inputClass: "default form-control",
    };
  }

  openAlert() {
    var id = this.props.item.id;
    window.$('#'+id+'').collapse('show');
    this.setState({
     open: true 
   })
  }

  closeAlert() {
    var items = this.props.parent.state.todos;
    var idx = items.indexOf(this.props.item)
    var title = items[idx].title;
    var id = this.props.item.id;
    var doneId = "done"+id+""
    window.$('#'+id+'').collapse('hide');
    document.getElementById(doneId).value = title;
  }

  async currentList () {
    var list = await Deserializer.userListId();
    var id = list[0].id;
    return id;
  }

  async editEvent() {
    var collapseId = this.props.item.id
    var doneId = "done"+collapseId+""
    var listId = await this.currentList();
    var itemId = this.props.item.id;
    var items = this.props.parent.state.todos;
    var newTitle = document.getElementById(doneId).value;
    if (newTitle.length === 0) {
      this.setState({
        inputClass: "blank form-control"
      })
    } else {
        var idx = items.indexOf(this.props.item)
        items[idx].title=newTitle;
        items[idx].color="info";
        this.props.parent.setState({
          todos: items
        });
        await Deserializer.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+listId+'/tasks/'+itemId,'PUT',{content:newTitle})
        var id = this.props.item.id;
        window.$('#'+id+'').collapse('hide');
        document.getElementById(doneId).value = newTitle;
    }
  }

  async deleteEvent() {
    var listId = await this.currentList();
    var items = this.props.parent.state.todos;
    var idx = items.indexOf(this.props.item)
    var itemId = this.props.item.id;
      if (idx!==-1){
        items.splice(idx,1)
        await Deserializer.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+listId+'/tasks/'+itemId,'DELETE')
      }
      this.props.parent.setState({
      todos: items
    });
  }

  render() {
    var collapseId = this.props.item.id
    var doneId = "done"+collapseId+""

    return (
        <div className="col"> 
          <div className="collapse" id={collapseId}>
            <div className="form-group">
              <label>What needs to be done?</label>
              <input id={doneId} className={this.state.inputClass}  defaultValue={this.props.item.title} maxLength={244}/>
            </div>
            <button onClick={this.editEvent.bind(this)}>Save</button>
            <button onClick={this.closeAlert.bind(this)}>Cancel</button>
          </div>
          <div className="list-group">
            <li className="list-group-item itemClass">{this.props.item.title}</li>
            <div className="btn-group btn-group-justified">
            <div className="btn btn-primary col-md-6" onClick={this.openAlert.bind(this)}>Edit</div>
            <div className="btn btn-danger col-md-6" onClick={this.deleteEvent.bind(this)}>Delete</div>
          </div>
          </div>
        </div>
      );
  }
}

export default Todo;
