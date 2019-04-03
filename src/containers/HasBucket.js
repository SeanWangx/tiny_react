import { connect } from 'react-redux';
import HasBucket from '../components/HasBucket';
import { fetchBucketSource } from '../store/actions';

const mapStateToProps = (state, ownProps) => {
  const bucketSelected = state.bucketSelected.name;
  const domains = state.bucketList.reduce((prev, cur) => {
    if (cur['name'] === bucketSelected) {
      return cur['domains'];
    }
    return prev;
  }, []);
  return {
    bucketSelected,
    domains,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBucketSource: payload => {
    return dispatch(fetchBucketSource(payload));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HasBucket);
