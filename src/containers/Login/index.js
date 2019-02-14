import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';

import api from '@/utils/api';

import './index.css';

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
};

class Login extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount () {
    const { accessKey, secretKey } = api.getMac();
    this.props.form.setFieldsValue({
      'accessKey': accessKey,
      'secretKey': secretKey
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // TODO
        openNotification('success', 'Login Successfully!');
        api.init(values['accessKey'], values['secretKey']);
      }
    });
  }

  render () {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Login">
        <div className="Login-Content">
          <h1>Tiny</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="AccessKey" {...formItemLayout}>
              {getFieldDecorator('accessKey', {
                rules: [{ required: true, message: 'Please input your Access Key!' }],
              })(
                <Input placeholder="AccessKey"/>
              )}
            </Form.Item>
            <Form.Item label="SecretKey" {...formItemLayout}>
              {getFieldDecorator('secretKey', {
                rules: [{ required: true, message: 'Please input your Secret Key!' }],
              })(
                <Input.Password placeholder="SecretKey"/>
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

export default Form.create({})(Login);
