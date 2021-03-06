import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import Login from '../../containers/Login';
import Manager from '../../containers/Manager';

import './index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/manager" component={Manager} />
            <Route render={() => <Redirect to="/manager" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
