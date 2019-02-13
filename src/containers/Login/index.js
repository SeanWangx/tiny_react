import React, { Component } from 'react';
import { Input } from 'antd';

import './index.css';

class Login extends Component {
  render () {
    return (
      <div className="Login">
        <Input placeholder="Access Key"/>
        <Input placeholder="Secret Key"/>
      </div>
    )
  }
}

export default Login;
