import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from './App';
import Home from './pages/home';
import Photo from './pages/photo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Router>
        <Route path="/home" component={Home} />
        <Route path="/photo" component={Photo} />
        <Route exact path="/" component={Home} />
      </Router>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
