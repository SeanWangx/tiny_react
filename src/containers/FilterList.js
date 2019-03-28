import { connect } from 'react-redux';
import FilterList from '../components/FilterList';
import {
  deleteBucket,
  fetchBuckets,
  selectBucket,
  fetchBucketZone,
  fetchBucketDomains
} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  buckets: state.buckets,
  selected: state.selected
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteBucket: bucket => {
    return dispatch(deleteBucket(bucket));
  },
  fetchBuckets: () => {
    return dispatch(fetchBuckets());
  },
  selectBucket: bucket => {
    return dispatch(selectBucket(bucket));
  },
  fetchBucketZone: bucket => {
    return dispatch(fetchBucketZone(bucket));
  },
  fetchBucketDomains: bucket => {
    return dispatch(fetchBucketDomains(bucket));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);
