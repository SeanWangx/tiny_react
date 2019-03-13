import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import BucketSider from '../BucketSider';
import BucketContent from '../BucketContent';
import SettingPage from '../../containers/SettingPage';

import './index.css';

const { Sider, Content } = Layout;

class Manager extends Component {
  constructor (props) {
    super(props);
    this.state = { view: 'content' };
    this.viewChange = this.viewChange.bind(this);
  }
  viewChange (view = 'content') {
    this.setState({ view });
  }
  render () {
    const { isAuth } = this.props;
    const { view } = this.state;

    return isAuth !== true ? (
      <Redirect to="/login" />
    ) : (
      <div className="manager-container">
        <Layout className="manager-layout">
          <Sider className="manager-sider">
            <BucketSider onViewChange={this.viewChange}/>
          </Sider>
          <Content className="manager-content">
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

Manager.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default Manager;
