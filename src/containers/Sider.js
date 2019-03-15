import { connect } from 'react-redux';
import Sider from '../components/Sider';
import { fetchBuckets, createBucket } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBuckets: () => {
    return dispatch(fetchBuckets());
  },
  createBucket: payload => {
    return dispatch(createBucket(payload));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sider);
