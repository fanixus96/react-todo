import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import LoginPage from './LoginPage.js';
import List from './List.js';

const history = createBrowserHistory({});
class Navigator extends Component {

		render() {
    	return (
    		 <Router history={history}>
      <div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/todo" component={List} />
        <List history={history}/>
      </div>
      
    </Router>
    	);
	}

}
export default Navigator;