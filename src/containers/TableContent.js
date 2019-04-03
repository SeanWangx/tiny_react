import { connect } from 'react-redux';
import TableContent from '../components/TableContent';
// import {} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  bucketSelected: state.bucketSelected.sourceList,
  sourceList: state.bucketSelected.name,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContent);
