import React from 'react';
import { Layout } from 'antd';
import BucketSider from '../BucketSider';
import './index.css';

const { Sider, Content } = Layout;

const Buckets = () => (
  <div className="buckets-container">
    <Layout className="buckets-layout">
      <Sider className="buckets-sider">
        <BucketSider />
      </Sider>
      <Content className="buckets-content">
        Content
      </Content>
    </Layout>
  </div>
)

export default Buckets;
