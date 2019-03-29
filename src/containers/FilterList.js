import { connect } from 'react-redux';
import FilterList from '../components/FilterList';
import {
  fetchBucketList,
  deleteBucket,
  fetchBucketZone,
  fetchBucketDomains,
  selectBucket,
} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  bucketList: state.bucketList,
  bucketSelected: state.bucketSelected.name
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBucketList: () => {
    return dispatch(fetchBucketList());
  },
  deleteBucket: bucket => {
    return dispatch(deleteBucket(bucket));
  },
  fetchBucketZone: bucket => {
    return dispatch(fetchBucketZone(bucket));
  },
  fetchBucketDomains: bucket => {
    return dispatch(fetchBucketDomains(bucket));
  },
  selectBucket: bucket => {
    return dispatch(selectBucket(bucket));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);
