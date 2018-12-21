import React from 'react';
import ReactDOM from 'react-dom';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import Navigator from './Navigator.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Navigator />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
