import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import Sider from '../../containers/Sider';
import Content from '../../containers/Content';
import Setting from '../../containers/Setting';

import './index.css';

const { Sider: SiderContainer, Content: ContentContainer } = Layout;

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
          <SiderContainer className="manager-sider">
            <Sider onViewChange={this.viewChange}/>
          </SiderContainer>
          <ContentContainer className="manager-content">
            {
              view === 'setting' ? (
                <Setting onBack={() => this.viewChange('content')}/>
              ) : (
                <Content />
              )
            }
          </ContentContainer>
        </Layout>
      </div>
    );
  }
}

Manager.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default Manager;
