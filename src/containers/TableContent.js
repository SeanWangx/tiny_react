import { connect } from 'react-redux';
import TableContent from '../components/TableContent';
// import {} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  bucketSelected: state.bucketSelected.name,
  sourceList: state.bucketSelected.sourceList,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContent);
