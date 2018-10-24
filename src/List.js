import React, { Component } from 'react';
import Todo from './Todo.js';

class List extends Component {

	constructor(props) {
    	super(props);

    	this.state = {
      		todos: [{id:1, value:"pierwszy"},{id:2, value:"drugi"},{id:3, value:"trzeci"},{id:4, value:"czwarty"}],
    	};
  	};

  	 createList(element) {
    	return <li key={element.value}>
              {element.value}
           </li>;
  };

 render() {
    return (
      <div>
      this.state.todos.map(function(item) {
        return <Todo parent={this} item={item} />
      })
      </div>
    );
  }

}

export default List;