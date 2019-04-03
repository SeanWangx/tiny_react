import { connect } from 'react-redux';
import FeatureContent from '../components/FeatureContent';
// import {} from '../store/actions';

const mapStateToProps = (state, ownProps) => {
  const sourceList = state.bucketSelected.sourceList;
  const domains = state.bucketList.reduce((prev, cur) => {
    if (cur['name'] === state.bucketSelected.name) {
      return cur['domains'];
    }
    return prev;
  }, []);
  return {
    sourceList,
    domains,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureContent);
