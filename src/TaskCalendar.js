import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';


class TaskCalendar extends Component {
	 constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }
	
	

	render() {
      return (
      	<FullCalendar
      		aspectRatio={4}
      		events={this.props.events}
      	/>
      );
    }

}

export default TaskCalendar;