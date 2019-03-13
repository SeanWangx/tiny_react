import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import PropTypes from 'prop-types';
import qiniu from '../../utils/qiniu';

import './index.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

class Login extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { accessKey, secretKey } = values;
      qiniu.init(accessKey, secretKey);
      if (!err) {
        this.props.fetchBuckets({
          accessKey,
          secretKey,
          successFn: () => 
          openNotification('success', 'Login Successfully!'),
          failFn: () => openNotification('error', 'Key Error!')
        })
      }
    })
  }
  render () {
    const { isAuth, form } = this.props;
    const { getFieldDecorator } = form;

    return isAuth === true ? (
      <Redirect to="/" />
    ) : (
      <div className="Login">
        <div className="Login-Content">
          <h1>Tiny</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="AccessKey" {...formItemLayout}>
              {getFieldDecorator('accessKey', {
                rules: [{ required: true, message: 'Please input your Access Key!' }],
              })(
                <Input placeholder="AccessKey" />
              )}
            </Form.Item>
            <Form.Item label="SecretKey" {...formItemLayout}>
              {getFieldDecorator('secretKey', {
                rules: [{ required: true, message: 'Please input your Secret Key!' }],
              })(
                <Input.Password placeholder="SecretKey" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  fetchBuckets: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

export default Form.create({})(Login);
