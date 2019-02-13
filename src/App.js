import React, { Component } from 'react';
import {
  BrowserRouter as Router,
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
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/buckets" component={Buckets} />
        </div>
      </Router>
    );
  }
}

export default App;
