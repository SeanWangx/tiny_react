import { connect } from 'react-redux';
import BucketList from '../components/BucketList';

const mapStateToProps = (state, ownProps) => ({
  buckets: state.buckets
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const FilterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketList);

export default FilterList;
