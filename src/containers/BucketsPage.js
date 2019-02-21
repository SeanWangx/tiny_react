import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Buckets from '../components/Buckets';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth,
  buckets: state.buckets
})

class BucketsPage extends Component {
  render () {
    const { isAuth, buckets } = this.props;
    if (isAuth !== true) return (<Redirect to="/login" />);
    return (<Buckets buckets={buckets}/>);
  }
}

export default connect(
  mapStateToProps
)(BucketsPage);
