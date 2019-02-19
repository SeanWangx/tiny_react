import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './index.css';

class Buckets extends Component {
  render() {
    if (this.props.isAuth !== true) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="Buckets">
        Buckets
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default Buckets;
