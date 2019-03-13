import { connect } from 'react-redux';
import Login from '../components/Login';
import { fetchBuckets } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBuckets: payload => {
    dispatch(fetchBuckets(payload));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
