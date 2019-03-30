import { connect } from 'react-redux';
import HasBucket from '../components/HasBucket';
// import {} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  sourceList: state.bucketSelected.sourceList
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HasBucket);
