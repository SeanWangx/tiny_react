import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Buckets from '../components/Buckets';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

class BucketsPage extends Component {
  render () {
    const { isAuth } = this.props;
    if (isAuth !== true) return (<Redirect to="/login" />);
    return (<Buckets />);
  }
}

export default connect(
  mapStateToProps
)(BucketsPage);
