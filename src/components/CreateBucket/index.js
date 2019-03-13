import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const Title = <div style={{textAlign: 'center'}}>创建存储空间</div>
const { Option } = Select;

export default Form.create({
  name: 'create_bucket'
})(
  class extends Component {
    validateBucket = (rule, value, callback) => {
      if (value.length > 65 || value.length < 3) {
        callback('存储空间名称在4～64个字符之间');
      } else {
        if (/^[0-9a-zA-Z\-_]$/g.test(value) === false) {
          callback('存储空间名称只能包含字母、数字、中划线、下划线');
        } else {
          callback();
        }
      }
    }

    render () {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          title={Title}
          okText="确认"
          cancelText="取消"
          visible={visible}
          onOk={onCreate}
          onCancel={onCancel}>
          <Form layout="vertical">
            <Form.Item label="存储空间名称">
              {getFieldDecorator('bucket', {
                rules: [
                  { required: true, message: '请输入存储空间名称！' },
                  { validator: this.validateBucket }
                ]
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="存储区域">
              {
                getFieldDecorator('region', {
                  initialValue: 'z0',
                  rules: [{ required: true, message: '请选择存储区域！' }]
                })(
                  <Select placeholder="请选择存储区域">
                    <Option value="z0">华东</Option>
                    <Option value="z1">华北</Option>
                    <Option value="z2">华南</Option>
                    <Option value="na0">北美</Option>
                    <Option value="as0">东南亚</Option>
                  </Select>
                )
              }
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
