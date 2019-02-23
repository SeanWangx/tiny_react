import { connect } from 'react-redux';
import BucketList from '../components/BucketList';

const mapStateToProps = (state, ownProps) => {
  const { filterText='' } = ownProps;
  return {
    buckets: filterText === '' ? state.buckets : state.buckets.filter(item => item.name.indexOf(filterText) !== -1)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({})

const FilterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketList);

export default FilterList;
