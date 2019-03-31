import { connect } from 'react-redux';
import HasBucket from '../components/HasBucket';
// import {} from '../store/actions';

const mapStateToProps = (state, ownProps) => {
  const sourceList = state.bucketSelected.sourceList;
  const bucket = state.bucketSelected.name;
  const domains = state.bucketList.reduce((prev, cur) => {
    if (prev === null && cur['name'] === bucket) {
      return cur['domains'];
    }
    return prev;
  }, null);
  return {
    sourceList,
    domains,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HasBucket);
