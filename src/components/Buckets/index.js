import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.css';

const { Sider, Content } = Layout;

class Buckets extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: ''
    };
  }
  render () {
    return (
      <div className="buckets-container">
        <Layout className="buckets-layout">
          <Sider className="buckets-sider">
            Sider
          </Sider>
          <Content className="buckets-content">
            Content
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Buckets;
