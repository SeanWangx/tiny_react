import { connect } from 'react-redux';
import Content from '../components/Content';

const mapStateToProps = (state, ownProps) => ({
  bucketSelected: state.bucketSelected.name
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
