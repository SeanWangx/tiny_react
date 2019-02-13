import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from '@/containers/Login';
import Buckets from '@/containers/Buckets';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/buckets" component={Buckets} />
            <Route component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
