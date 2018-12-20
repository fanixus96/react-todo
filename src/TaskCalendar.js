import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';


class TaskCalendar extends Component {
   constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  addEvent(date) {
  	 this.props.parent.setState({
     	startDate: date
    })
  	this.props.parent.openAlert();
  }

   showFullTodo(item) {
    this.props.parent.setState({
      visible: true,
      details: item.details,
      title: item.title,
    })
  }


  render() {
    return (
      <FullCalendar
        events={this.props.events}
        dayClick={this.addEvent.bind(this)}
        eventClick={this.showFullTodo.bind(this)}
      />
    );
  }

}

export default TaskCalendar;
