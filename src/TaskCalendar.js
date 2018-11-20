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


  render() {
    return (
      <FullCalendar
        events={this.props.events}
        dayClick={this.addEvent.bind(this)}
        //eventClick={this.props.parent.editEvent()}
      />
    );
  }

}

export default TaskCalendar;
