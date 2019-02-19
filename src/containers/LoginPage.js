import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { notification } from 'antd';

import Login from '../components/Login';
import { addMac, refreshBuckets } from '../store/actions';
import qiniu from '../utils/qiniu';
import { fetchBuckets } from '../services';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: payload => {
    dispatch(addMac(payload));
  },
  refreshBuckets: payload => {
    dispatch(refreshBuckets(payload));
  }
})

const openNotification = (type, message) => {
  notification[type]({
    message,
    duration: 2
  });
}

class LoginPage extends Component {
  constructor (props) {
    super(props);
    this.fetchValues = this.fetchValues.bind(this);
  }
  fetchValues (payload) {
    const { accessKey, secretKey } = payload;
    qiniu.init(accessKey, secretKey);
    fetchBuckets().then(res => {
      console.log(res);
      const { data } = res;
      this.props.refreshBuckets(data.map(item => ({
        name: item,
        zone: '',
        domains: []
      })));
      openNotification('success', 'Login Successfully!');
      this.props.login({ accessKey, secretKey });
    }).catch(err => {
      console.error(err);
      openNotification('error', 'Key Error!');
    })
  }
  render () {
    const { isAuth } = this.props;
    if (isAuth === true) return (<Redirect to="/" />);
    return (<Login fetchValues={this.fetchValues}/>);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
