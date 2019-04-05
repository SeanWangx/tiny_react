import { connect } from 'react-redux';
import UploadContent from '../components/UploadContent';
// import {} from '../store/actions';

const mapStateToProps = (state, ownProps) => {
  let bucketSelected = state.bucketSelected.name;
  let zone = state.bucketList.reduce((prev, cur) => {
    if (cur['name'] === bucketSelected) {
      return cur['zone'];
    }
    return prev;
  }, '');
  return {
    bucketSelected,
    zone,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadContent);
