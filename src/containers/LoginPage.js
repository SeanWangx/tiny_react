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

export default LoginPage;
