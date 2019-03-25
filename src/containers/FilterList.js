import { connect } from 'react-redux';
import FilterList from '../components/FilterList';
import { deleteBucket, fetchBuckets } from '../store/actions';

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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);
