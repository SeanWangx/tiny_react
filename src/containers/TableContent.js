import { connect } from 'react-redux';
import TableContent from '../components/TableContent';
import { changeFileType, deleteFile } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  bucketSelected: state.bucketSelected.name,
  sourceList: state.bucketSelected.sourceList,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeFileType: payload => {
    return dispatch(changeFileType(payload));
  },
  deleteFile: payload => {
    return dispatch(deleteFile(payload));
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContent);
