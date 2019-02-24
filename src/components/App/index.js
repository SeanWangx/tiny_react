import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import LoginPage from '@/containers/LoginPage';
import BucketsPage from '@/containers/BucketsPage';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route exact path="/buckets" component={BucketsPage} />
            <Route path="/buckets/:name" component={BucketsPage} />
            <Route render={() => <Redirect to="/buckets" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
