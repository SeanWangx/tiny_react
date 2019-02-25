import React, { Component } from 'react';
import { Layout } from 'antd';
import BucketSider from '../BucketSider';
import BucketContent from '../BucketContent';
import SettingPage from '../../containers/SettingPage';
import './index.css';

const { Sider, Content } = Layout;
class Buckets extends Component {
  constructor (props) {
    super(props);
    this.state = { view: 'content' };
    this.viewChange = this.viewChange.bind(this);
  }
  viewChange (view = 'content') {
    this.setState({view});
  }
  render () {
    const { view } = this.state;
    return (
      <div className="buckets-container">
        <Layout className="buckets-layout">
          <Sider className="buckets-sider">
            <BucketSider onViewChange={this.viewChange}/>
          </Sider>
          <Content className="buckets-content">
            {
              view === 'setting' ? (
                <SettingPage onBack={() => this.viewChange('content')}/>
              ) : (
                <BucketContent />
              )
            }
          </Content>
        </Layout>
       </div>
     );
  }
}

export default Buckets;
