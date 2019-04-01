import { connect } from 'react-redux';
import HasBucket from '../components/HasBucket';
import { fetchBucketSource } from '../store/actions';

const mapStateToProps = (state, ownProps) => {
  const sourceList = state.bucketSelected.sourceList;
  const bucket = state.bucketSelected.name;
  const domains = state.bucketList.reduce((prev, cur) => {
    if (cur['name'] === bucket) {
      return cur['domains'];
    }
    return prev;
  }, []);
  return {
    bucketSelected: bucket,
    sourceList,
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
