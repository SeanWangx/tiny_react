import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { addMac } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: payload => {
    dispatch(addMac(payload));
  }
})

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

class Test extends Component {
  render () {
    const { isAuth } = this.props;
    if (isAuth === true) return (<Redirect to="/" />);
    return (<p>login</p>);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
// export default LoginPage;
