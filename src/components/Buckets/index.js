import React, { Component } from 'react';
import { Layout, Icon, Menu } from 'antd';

import './index.css';

const { Sider, Content } = Layout;

class Buckets extends Component {
  constructor (props) {
    super(props);
    this.selectBucket = this.selectBucket.bind(this);
  }
  selectBucket (index) {
    console.log(index);
  }
  render() {
    console.log(this.props);
    const { buckets = [] } = this.props;
    return (
      <div className="Buckets">
        <Layout className="BucketsLayout">
          <Sider className="BucketsSider">
            <div className="BucketsList">
              <Menu theme="dark" style={{'backgroundColor': '#545c64'}}>
                {
                  buckets.map((item, index) => {
                    return (
                      <Menu.Item key={index} onClick={() => this.selectBucket(index)}>
                        <span>{ item.name }</span>
                      </Menu.Item>
                    );
                  })
                }
              </Menu>
            </div>
            <div className="BucektsBtnRow">
              <Icon type="plus-circle" className="BucketsBtn"/>
            </div>
            <div className="BucektsBtnRow" style={
              {'position': 'absolute', 'left':'0', 'bottom': '0'}
            }>
              <Icon type="setting" className="BucketsBtn"/>
            </div>
          </Sider>
          <Content className="BucketsContent">Content</Content>
        </Layout>
      </div>
    );
  }
}

export default Buckets;
