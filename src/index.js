import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Loadable from 'react-loadable';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Loading = ({ isLoading, error }) => {
  if (isLoading) {
    return null;
  }
  if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  return null;
};

const HomeComp = Loadable({
  loader: () => import('./pages/home'),
  loading: Loading
});

const PhotoComp = Loadable({
  loader: () => import('./pages/photo'),
  loading: Loading
});

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Router>
        <Route path="/home" component={HomeComp} />
        <Route path="/photo" component={PhotoComp} />
        <Route exact path="/" component={HomeComp} />
      </Router>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
