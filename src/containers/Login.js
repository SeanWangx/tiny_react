import { connect } from 'react-redux';
import Login from '../components/Login';
import { login } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.baseConfig.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: ({ accessKey, secretKey }) => {
    return dispatch(login({ accessKey, secretKey }));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
