import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoginPage from '@/containers/LoginPage';
import Buckets from '../Buckets';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Buckets} />
            <Route path="/login" component={LoginPage} />
            <Route path="/buckets" component={Buckets} />
            <Route component={Buckets} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
