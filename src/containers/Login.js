import { connect } from 'react-redux';
import Login from '../components/Login';
import { addMac, fetchBuckets } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBuckets: () => {
    return dispatch(fetchBuckets());
  },
  addMac: payload => {
    return dispatch(addMac(payload));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
