import { connect } from 'react-redux';
import Manager from '../components/Manager';
import { fetchBuckets } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBuckets: () => {
    return dispatch(fetchBuckets());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Manager);
