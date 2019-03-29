import { connect } from 'react-redux';
import Login from '../components/Login';
import { login } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: payload => {
    return dispatch(login(payload));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
