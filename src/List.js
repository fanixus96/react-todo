import React, { Component } from 'react';
import Todo from './Todo.js';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TaskCalendar from './TaskCalendar.js';
import Deserializer from './Deserializer.js'
import { BounceLoader } from 'react-spinners';
import './main.css';

class List extends Component {

  async componentWillMount() {
    if (localStorage.getItem("uid") === "null" || localStorage.getItem("uid") === null) {
      this.setState({
        listClass: "afterClicked",
      });
      this.props.history.push("/")
    } else {
      this.loadRemoteTodos()
      this.setState({
        loading: true,
        listClass: "list container",
      });
    }
  }
 
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      todos1: [],
      open: false,
      startDate: moment(),
      visible: false,
      title: "",
      details: "",
      collapsed: false,
      loading: false,
      inputClass: "default form-control",
      listClass: "list container",
    };
  }

async loadRemoteTodos() {
  var RemoteTodos = await Deserializer.asyncTodos();
  this.setState({
    todos: RemoteTodos,
    loading: false,
  });
}

async currentList () {
  var list = await Deserializer.userListId();
  var id = list[0].id;
  return id;
}

  openAlert() {
    window.$('#wrong-pass').show();
    this.setState({
      open: true
    });
  }

  dateChange(date){
    this.setState({
      startDate: date
    });
  }

  async createTodo() {
    var id = await this.currentList();
    var itemValue = document.getElementById("tvalue").value;
    if (itemValue.length === 0) {
      this.setState({
        inputClass: "blank form-control"
      })
    } else {
        var time = moment(this.state.startDate).format('YYYY-MM-DD');
        var newTodos = this.state.todos.slice(0);
        var request = await Deserializer.fetchPattern('https://tower-rails.herokuapp.com/task_lists/'+id+'/tasks','POST',{content:itemValue, happens_at:time, details:"notDone"})
        var itemId = await request.json();
        document.getElementById("tvalue").value = "";
        this.setState({
          open: false
        })
        newTodos.push({id:itemId.id, title:itemValue, start:time});
        this.setState({
          todos: newTodos
        });
        
    }
  }

  backgroundClicked() {
    this.setState({
      open: false
    })
  }

  signOut() {
    this.setState({
      loading: true,
    })
  	localStorage.clear();
  	window.location.reload();
  }

  onDismiss() {
    this.setState({
     visible: false 
   });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    var self = this;
    if (this.state.loading) {
      return (
        <div className='loading'>
        <BounceLoader
          color={'#007bff'}
          loading={this.state.loading}
        />
        </div>
        )
    } else {
        return (
          <div className={this.state.listClass}>
            <div className="row">
              <div className="col-md-12">
                <nav className="navbar">
                  <span className="navbar-brand mb-0">React Todo App</span>
                  <span onClick={this.signOut.bind(this)} className="btn fas fa-sign-out-alt justify-content-end"></span>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Popup open={this.state.open} onClose={this.backgroundClicked.bind(this)}>
                  <form >
                    <div className="form-group">
                      <label>What needs to be done?</label>
                      <input id="tvalue" className={this.state.inputClass} maxLength={244}/>
                    </div>
                    <div className="form-group">
                      <label>Additional instructions</label>
                      <input id="dvalue" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label>When?</label>
                      <div id="tcalendar">
                        <DatePicker
                          dateFormat="YYYY-MM-DD"
                          selected={this.state.startDate}
                          onChange={this.dateChange.bind(this)} 
                        />
                      </div>
                    </div>
                    <div className="btn btn-secondary" onClick={this.createTodo.bind(this)}>Create</div>
                  </form>
                </Popup>
                <div className="column">
                  {this.state.todos.map(function(item) {
                    return <Todo parent={self} item={item} key={item.id}/>
                  })}
                </div>
                <div type="button" className="btn btn-primary btn-lg btn-block" onClick={this.openAlert.bind(this)}> New </div>
              </div>
              <div className="col-md-8 column">
                <TaskCalendar events={this.state.todos} parent={self} />
              </div>
            </div>
          </div>
        );
    }
  }
}

export default List;
