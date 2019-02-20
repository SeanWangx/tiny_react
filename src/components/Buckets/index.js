import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import './index.css';

const { Sider, Content } = Layout;

class Buckets extends Component {
  render() {
    return (
      <div className="Buckets">
        <Layout className="BucketsLayout">
          <Sider className="BucketsSider">
            <div className="BucketsList">
              Buckets
            </div>
            <div className="BucketsSetting">
              <Icon type="setting" className="BucketsSettingBtn"/>
            </div>
          </Sider>
          <Content className="BucketsContent">Content</Content>
        </Layout>
      </div>
    );
  }
}

export default Buckets;
